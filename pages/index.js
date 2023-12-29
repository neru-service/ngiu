// pages/index.js

import { useQuery } from 'react-query';
import axios from 'axios';
import { useRouter } from 'next/router';

const ImageUploader = () => {
  const router = useRouter();
  const { data: images, refetch } = useQuery('images', fetchImages);

  const handleFileUpload = async (e, orientation) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('file', file);
    formData.append('authorName', "John Doe"); // 作者名を固定またはフォームから取得
    formData.append('orientation', orientation);

    await axios.post('/api/upload', formData);
    await refetch(); // アップロード後にデータを再取得

    // アップロード後に画像の表示リンクにリダイレクト
    const order = images[orientation]?.length || 1;
    router.push(`/img/${orientation}/${order}`);
  };

  const getImgSrc = (image) => {
    if (image) {
      return `/uploads/${image.orientation}/${image.filename}`;
    } else {
      return '/noimage.jpg'; // 画像がない場合に表示するデフォルトの画像
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-3xl mx-auto">
        <div>
          <label className="text-2xl font-bold mb-4">Image Uploader</label>
          <div>
            <input
              type="radio"
              name="orientation"
              value="len"
              onChange={() => {}}
              className="mr-2"
            />
            縦
            <input
              type="radio"
              name="orientation"
              value="sid"
              onChange={() => {}}
              className="mr-2"
            />
            横
          </div>
          <input
            type="file"
            onChange={(e) => handleFileUpload(e, document.querySelector('input[name="orientation"]:checked').value)}
            className="bg-gray-800 text-white py-2 px-4 rounded"
          />
          {images && (
            <div className="mt-8">
              <h2 className="text-2xl font-bold mb-4">Uploaded Images</h2>
              <div className="grid grid-cols-3 gap-4">
                {images.len && images.len.map((image) => (
                  <div key={image.order} className="mb-4">
                    <img
                      src={getImgSrc(image)}
                      alt="uploaded"
                      className="w-full h-auto rounded"
                    />
                    <p className="text-gray-400 mt-2">Author: {image.authorName}</p>
                  </div>
                ))}
                {images.sid && images.sid.map((image) => (
                  <div key={image.order} className="mb-4">
                    <img
                      src={getImgSrc(image)}
                      alt="uploaded"
                      className="w-full h-auto rounded"
                    />
                    <p className="text-gray-400 mt-2">Author: {image.authorName}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ImageUploader;

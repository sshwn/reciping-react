const ImageUpload = () => {
    return (
      <div className="mb-6 p-4 border rounded-lg shadow-sm bg-gray-50">
        <h3 className="text-lg font-semibold mb-2">요리 완성 사진</h3>
        <input type="file" accept="image/*" className="w-full border rounded p-2" />
        <h3 className="text-lg font-semibold mt-4">동영상 링크</h3>
        <input type="text" placeholder="Youtube, 네이버TV 등 링크 입력" className="w-full border rounded p-2" />
      </div>
    );
  };
  
  export default ImageUpload;
  
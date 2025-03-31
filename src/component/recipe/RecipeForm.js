import { useState } from "react";
import RecipeCategory from "./RecipeCategory";
import RecipeCookInfo from "./RecipeCookInfo";
import RecipeIngredientsInput from "./RecipeIngredientsInput";
import RecipeStepForm from "./RecipeStepForm";
import ImageUpload from "./ImageUpload";
import RecipeTags from "./RecipeTags";
import RecipePreview from "./RecipePreview";

const RecipeForm = () => {
  const [videoUrl, setVideoUrl] = useState("");
  const [thumbnail, setThumbnail] = useState(null);
  const [recipeImage, setRecipeImage] = useState(null);

  const handleVideoUrlChange = (e) => {
    setVideoUrl(e.target.value);
    const videoId = e.target.value.split("v=")[1]?.split("&")[0];
    setThumbnail(videoId ? `https://img.youtube.com/vi/${videoId}/0.jpg` : null);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setRecipeImage(URL.createObjectURL(file));
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white shadow-lg rounded-2xl">
      <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">레시피 등록</h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* 왼쪽 (2칸 차지) */}
        <div className="lg:col-span-2 space-y-6">
          <div>
            <label className="block text-lg font-semibold mb-2">레시피 제목</label>
            <input type="text" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400" placeholder="예) 소고기 미역국 끓이기" />
          </div>

          <div>
            <label className="block text-lg font-semibold mb-2">요리 소개</label>
            <textarea className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400" rows="4" placeholder="요리의 배경이나 특징을 적어주세요." />
          </div>

          <div className="flex items-center gap-4">
            <div className="flex-1">
              <label className="block text-lg font-semibold mb-2">동영상</label>
              <textarea
                value={videoUrl}
                onChange={handleVideoUrlChange}
                className="w-full h-[100px] p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
                placeholder="Youtube, 네이버TV 등 동영상 주소 입력"
              />
            </div>
            <div className="w-[248px] h-[100px] flex-shrink-0">
              {thumbnail ? (
                <div className="w-full h-full flex justify-center items-center border-2 border-dashed rounded-lg">
                  <img src={thumbnail} alt="동영상 썸네일" className="w-full h-full object-cover rounded-lg" />
                </div>
              ) : (
                <div className="w-full h-full flex justify-center items-center border-2 border-dashed rounded-lg">
                  <span className="text-gray-500 text-center">동영상 썸네일</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* 오른쪽 (대표 이미지 업로드) */}
        <div className="flex flex-col items-center">
          <input type="file" onChange={handleImageUpload} className="hidden" id="imageUpload" accept="image/*" />
          <label htmlFor="imageUpload" className="cursor-pointer w-48 h-48 border-2 border-dashed flex flex-col justify-center items-center rounded-lg">
            {recipeImage ? (
              <img src={recipeImage} alt="Recipe" className="w-full h-full object-cover rounded-lg" />
            ) : (
              <span className="text-gray-500 text-center">요리 대표 사진</span>
            )}
          </label>
        </div>
      </div>

      {/* 카테고리 수정 */}
      <div className="mt-6">
        <label className="block text-lg font-semibold mb-2">카테고리</label>
          <RecipeCategory />
      </div>

      {/* 요리정보 수정 */}
      <div className="mt-6">
        <label className="block text-lg font-semibold mb-2">요리정보</label>
          <RecipeCookInfo />
      </div>
      {/* 추가 컴포넌트 */}
      <RecipeIngredientsInput />
      <RecipeStepForm />
      <ImageUpload />
      <RecipeTags />
      <RecipePreview />

      {/* 버튼 */}
      <div className="flex justify-end gap-4 mt-8">
        <button className="px-6 py-3 bg-gray-300 text-gray-800 rounded-lg">취소</button>
        <button className="px-6 py-3 bg-blue-600 text-white rounded-lg">저장 후 공개하기</button>
      </div>
    </div>
  );
};

export default RecipeForm;

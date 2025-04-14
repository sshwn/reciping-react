import { useState } from "react";

import RecipeMaterialInfo from "./RecipeMaterialInfo";
import RecipeCookingStep from "./RecipeCookingStep";
import RecipeTags from "./RecipeTags";
import RecipePreview from "./RecipePreview";
import RecipeInfo from "./RecipeInfo";
import RecipeTitle from "./RecipeTitle";
import './RecipeForm.css';
import RecipeCookingTip from "./RecipeCookingTip";

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
    <div className="container recipe_regi">
        <div className="regi_center">
          {/* 제목 */}
          <RecipeTitle />
          {/* 레시피정보 */}
          <RecipeInfo />
          {/* 추가 컴포넌트 */}
          <RecipeMaterialInfo />
          {/* 요리순서 */}
          <RecipeCookingStep />
          {/* 요리팁 */}
          <RecipeCookingTip />
          {/* 태그 */}
          <RecipeTags />

          {/* 버튼 */}
          <div className="flex justify-end gap-4 mt-8">
            <button className="px-6 py-3 bg-gray-300 text-gray-800 rounded-lg">취소</button>
            <button className="px-6 py-3 bg-blue-600 text-white rounded-lg">저장 후 공개하기</button>
          </div>
        </div>
    </div>
  );
};

export default RecipeForm;

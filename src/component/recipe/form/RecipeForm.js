import { useState } from "react";
import RecipeMaterialInfo from "./RecipeMaterialInfo";
import RecipeCookingStep from "./RecipeCookingStep";
import RecipeTags from "./RecipeTags";
import RecipeInfo from "./RecipeInfo";
import RecipeTitle from "./RecipeTitle";
import './RecipeForm.css';
import RecipeCookingTip from "./RecipeCookingTip";
import axios from "axios";

const RecipeForm = () => {
  const [title, setTitle] = useState('');
  const [tags, setTags] = useState([]);
  const [info, setInfo] = useState({});
  const [materials, setMaterials] = useState([]);
  const [steps, setSteps] = useState([]);
  const [tip, setTip] = useState('');
  const [category, setCategory] = useState('');
  const [videoUrl, setVideoUrl] = useState("");
  const [thumbnail, setThumbnail] = useState(null);
  const [recipeImage, setRecipeImage] = useState(null);

  const handleVideoUrlChange = (e) => {
    const url = e.target.value;
    setVideoUrl(url);
    // 유튜브 URL에서 videoId 추출
    const videoId = url.split("v=")[1]?.split("&")[0];
    // 썸네일 이미지 URL 설정
    setThumbnail(videoId ? `https://img.youtube.com/vi/${videoId}/0.jpg` : null);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // 파일을 URL로 변환하여 이미지 미리보기 제공
      setRecipeImage(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async () => {
    const recipeData = {
      title,
      tags,
      info,
      materials,
      steps,
      tip,
      category,
      thumbnail,
    };
    console.log('submit', recipeData);
    // 여기서 axios.post로 서버에 데이터를 전송
    try {
//      const response = await axios.post('http://localhost:8000/api/recipe-service/saveRecipeInfo', recipeData); // 장보기 목록 조회
//      setMemos(response.data);
    } catch (error) {
      console.error('Failed to fetch memos:', error);
    }
    // axios.post('/api/recipe', recipeData).then(response => { ... }).catch(error => { ... });
  };

  return (
      <div className="container recipe_regi">
        <div className="regi_center">
          {/* 제목 */}
          <RecipeTitle />
          {/* 레시피정보 */}
          <RecipeInfo info={info} setInfo={setInfo} />
          {/* 추가 컴포넌트 */}
          <RecipeMaterialInfo materials={materials} setMaterials={setMaterials} />
          {/* 요리순서 */}
          <RecipeCookingStep steps={steps} setSteps={setSteps} />
          {/* 요리팁 */}
          <RecipeCookingTip tip={tip} setTip={setTip} />
          {/* 태그 */}
          <RecipeTags tags={tags} setTags={setTags} />

          {/* 버튼 */}
          <div className="flex justify-end gap-4 mt-8">
            <button className="px-6 py-3 bg-gray-300 text-gray-800 rounded-lg">취소</button>
            <button className="px-6 py-3 bg-blue-600 text-white rounded-lg" onClick={handleSubmit}>저장 후 공개하기</button>
          </div>
        </div>
      </div>
  );
};

export default RecipeForm;

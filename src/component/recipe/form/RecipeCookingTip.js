import React, { useState } from 'react';

const RecipeCookingTip = () => {
  const [tip, setTip] = useState('');

  // 텍스트가 변경될 때마다 상태 업데이트
  const handleChange = (e) => {
    setTip(e.target.value);
  };

  return (
    <div className="cont_box pad_l_60">
      <p className="cont_tit4">요리팁</p>

      {/* 텍스트 영역 */}
      <textarea
        name="cok_tip"
        id="cok_tip"
        className="form-control step_cont"
        placeholder="예) 고기요리에는 소금보다 설탕을 먼저 넣어야 단맛이 겉돌지 않고 육질이 부드러워요."
        style={{ height: '120px', width: '620px', resize: 'none' }}
        value={tip}
        onChange={handleChange}
      />
    </div>
  );
};

export default RecipeCookingTip;

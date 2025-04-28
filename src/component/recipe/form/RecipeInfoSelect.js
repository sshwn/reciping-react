import React, { useState } from 'react';

interface Props {
    onCategoryChange: (categories: {
        portion: string;
        time: string;
        degree: string;
    }) => void;
}

const RecipeInfoSelect: React.FC<Props> = ({ onCategoryChange }) => {
    const [portion, setPortion] = useState('');
    const [time, setTime] = useState('');
    const [degree, setDegree] = useState('');

    // 각 select의 onChange 핸들러
    const handlePortionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newPortion = e.target.value;
        setPortion(newPortion);
        // 상위 컴포넌트로 변경된 값 전달
        onCategoryChange({ portion: newPortion, time, degree });
    };

    const handleTimeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newTime = e.target.value;
        setTime(newTime);
        // 상위 컴포넌트로 변경된 값 전달
        onCategoryChange({ portion, time: newTime, degree });
    };

    const handleDegreeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newDegree = e.target.value;
        setDegree(newDegree);
        // 상위 컴포넌트로 변경된 값 전달
        onCategoryChange({ portion, time, degree: newDegree });
    };

    return (
        <div className="cont_line">
            <p className="cont_tit4">요리정보</p>
            {/*인원*/}
            <select
                name="rcpServings"
                id="rcpServings"
                value={portion}
                onChange={handlePortionChange}
            >
                <option value="">인원</option>
                <option value="1">1인분</option>
                <option value="2">2인분</option>
                <option value="3">3인분</option>
                <option value="4">4인분</option>
                <option value="5">5인분</option>
                <option value="6">6인분이상</option>
            </select>

            <span className="pad_l_30">{/*시간*/} </span>
            <select
                name="rcpTime"
                id="rcpTime"
                value={time}
                onChange={handleTimeChange}
            >
                <option value="">시간</option>
                <option value="5">5분이내</option>
                <option value="10">10분이내</option>
                <option value="15">15분이내</option>
                <option value="20">20분이내</option>
                <option value="30">30분이내</option>
                <option value="60">60분이내</option>
                <option value="90">90분이내</option>
                <option value="120">2시간이내</option>
                <option value="999">2시간이상</option>
            </select>

            <span className="pad_l_30">{/*난이도*/} </span>
            <select
                name="rcpDifficulty"
                id="rcpDifficulty"
                value={degree}
                onChange={handleDegreeChange}
            >
                <option value="">난이도</option>
                <option value="1">아무나</option>
                <option value="2">초급</option>
                <option value="3">중급</option>
                <option value="4">고급</option>
                <option value="5">신의경지</option>
            </select>
        </div>
    );
};

export default RecipeInfoSelect;

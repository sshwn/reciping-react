import React, { useState } from 'react';

const RecipeInfoSelect = () => {
    const [portion, setPortion] = useState('');
    const [time, setTime] = useState('');
    const [degree, setDegree] = useState('');

    // 각 select의 onChange 핸들러
    const handlePortionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setPortion(e.target.value);
    };

    const handleTimeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setTime(e.target.value);
    };

    const handleDegreeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setDegree(e.target.value);
    };

    return (
        <div className="cont_line">
            <p className="cont_tit4">요리정보</p>
            {/*인원*/}
            <select
                name="cok_portion"
                id="cok_portion"
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
                name="cok_time"
                id="cok_time"
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
                name="cok_degree"
                id="cok_degree"
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

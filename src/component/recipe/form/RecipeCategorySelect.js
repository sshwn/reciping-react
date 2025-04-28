import React, { useState, useEffect } from 'react';

interface Props {
    onCategoryChange: (categories: {
        category1: string;
        category2: string;
        category3: string;
        category4: string;
    }) => void;
}

const RecipeCategorySelect = ({ onCategoryChange }: Props) => {
    const [category1, setCategory1] = useState('');
    const [category2, setCategory2] = useState('');
    const [category3, setCategory3] = useState('');
    const [category4, setCategory4] = useState('');

    useEffect(() => {
        onCategoryChange({ category1, category2, category3, category4 });
    }, [category1, category2, category3, category4, onCategoryChange]);

    const handleCategory1Change = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setCategory1(e.target.value);
    };

    const handleCategory2Change = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setCategory2(e.target.value);
    };

    const handleCategory3Change = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setCategory3(e.target.value);
    };

    const handleCategory4Change = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setCategory4(e.target.value);
    };

    return (
        <div className="cont_line">
            <p className="cont_tit4">카테고리</p>

            {/* 종류별 */}
            <select
                name="rcpCategory"
                id="rcpCategory"
                value={category1}
                onChange={handleCategory1Change}
            >
                <option value="">종류별</option>
                <option value="63">밑반찬</option>
                <option value="56">메인반찬</option>
                <option value="54">국/탕</option>
                <option value="55">찌개</option>
                <option value="60">디저트</option>
                <option value="53">면/만두</option>
                <option value="52">밥/죽/떡</option>
                <option value="61">퓨전</option>
                <option value="57">김치/젓갈/장류</option>
                <option value="58">양념/소스/잼</option>
                <option value="65">양식</option>
                <option value="64">샐러드</option>
                <option value="68">스프</option>
                <option value="66">빵</option>
                <option value="69">과자</option>
                <option value="59">차/음료/술</option>
                <option value="62">기타</option>
            </select>

            {/* 상황별 */}
            <select
                name="rcpOccasion"
                id="rcpOccasion"
                value={category2}
                onChange={handleCategory2Change}
            >
                <option value="">상황별</option>
                <option value="12">일상</option>
                <option value="18">초스피드</option>
                <option value="13">손님접대</option>
                <option value="19">술안주</option>
                <option value="21">다이어트</option>
                <option value="15">도시락</option>
                <option value="43">영양식</option>
                <option value="17">간식</option>
                <option value="45">야식</option>
                <option value="20">푸드스타일링</option>
                <option value="46">해장</option>
                <option value="44">명절</option>
                <option value="14">이유식</option>
                <option value="22">기타</option>
            </select>

            {/* 방법별 */}
            <select
                name="rcpMethod"
                id="rcpMethod"
                value={category3}
                onChange={handleCategory3Change}
            >
                <option value="">방법별</option>
                <option value="6">볶음</option>
                <option value="1">끓이기</option>
                <option value="7">부침</option>
                <option value="36">조림</option>
                <option value="41">무침</option>
                <option value="42">비빔</option>
                <option value="8">찜</option>
                <option value="10">절임</option>
                <option value="9">튀김</option>
                <option value="38">삶기</option>
                <option value="67">굽기</option>
                <option value="39">데치기</option>
                <option value="37">회</option>
                <option value="11">기타</option>
            </select>

            {/* 재료별 */}
            <select
                name="rcpIngredientType"
                id="rcpIngredientType"
                value={category4}
                onChange={handleCategory4Change}
            >
                <option value="">재료별</option>
                <option value="70">소고기</option>
                <option value="71">돼지고기</option>
                <option value="72">닭고기</option>
                <option value="23">육류</option>
                <option value="28">채소류</option>
                <option value="24">해물류</option>
                <option value="50">달걀/유제품</option>
                <option value="33">가공식품류</option>
                <option value="47">쌀</option>
                <option value="32">밀가루</option>
                <option value="25">건어물류</option>
                <option value="31">버섯류</option>
                <option value="48">과일류</option>
                <option value="27">콩/견과류</option>
                <option value="26">곡류</option>
                <option value="34">기타</option>
            </select>

            <span className="guide" style={{ margin: '-22px 0 0 146px' }}>
                분류를 바르게 설정해주시면, 이용자들이 쉽게 레시피를 검색할 수 있어요.
            </span>
        </div>
    );
};

export default RecipeCategorySelect;

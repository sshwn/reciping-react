import React, { useState } from 'react';

const RecipeTags = () => {
    const [tags, setTags] = useState([]);
    const [inputValue, setInputValue] = useState('');

    // 태그 추가 처리
    const addTag = (e) => {
        if (e.key === 'Enter' && inputValue.trim() !== '') {
            setTags([...tags, inputValue.trim()]);
            setInputValue('');
        }
    };

    // 태그 삭제 처리
    const removeTag = (index) => {
        setTags(tags.filter((tag, i) => i !== index));
    };

    return (
        <div className="cont_box pad_l_60">
            <p className="cont_tit4">태그</p>

            {/* 히든 인풋 */}
            <input
                type="hidden"
                name="boa_tx_tag"
                value={tags.join(', ')}
                id="mySingleFieldTags"
                style={{ width: '100%' }}
                className="tagit-hidden-field"
            />

            {/* 태그 리스트 */}
            <ul className="tagit ui-widget ui-widget-content ui-corner-all">
                {tags.map((tag, index) => (
                    <li key={index} className="tagit-choice">
                        {tag}
                        <button
                            type="button"
                            onClick={() => removeTag(index)}
                            style={{ marginLeft: '5px', background: 'none', border: 'none', color: 'red' }}
                        >
                            x
                        </button>
                    </li>
                ))}
                <li className="tagit-new">
                    <input
                        type="text"
                        className="ui-widget-content ui-autocomplete-input"
                        autocomplete="off"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyDown={addTag}
                    />
                </li>
            </ul>

            <span style={{ display: 'block', color: '#666', marginBottom: '-8px', marginLeft: '140px' }}>
        주재료, 목적, 효능, 대상 등을 태그로 남겨주세요.
        <em style={{ fontStyle: 'normal', color: '#999', paddingLeft: '8px' }}>
          예) 돼지고기, 다이어트, 비만, 칼슘, 감기예방, 이유식, 초간단
        </em>
      </span>
        </div>
    );
};

export default RecipeTags;

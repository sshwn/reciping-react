import React, { useState } from 'react';

const RecipeMaterialInfo = () => {
    const [materialGroups, setMaterialGroups] = useState([
        { title: '재료', materials: [{ name: '', amount: '', unit: '', note: '' }] },
    ]);

    // 재료 묶음 추가
    const addMaterialGroup = () => {
        setMaterialGroups([
            ...materialGroups,
            { title: '재료', materials: [{ name: '', amount: '', unit: '', note: '' }] },
        ]);
    };

    // 재료 추가
    const addMaterial = (groupIndex: number) => {
        const updatedGroups = [...materialGroups];
        updatedGroups[groupIndex].materials.push({ name: '', amount: '', unit: '', note: '' });
        setMaterialGroups(updatedGroups);
    };

    // 재료 삭제
    const delMaterial = (groupIndex: number, materialIndex: number) => {
        const updatedGroups = [...materialGroups];
        updatedGroups[groupIndex].materials.splice(materialIndex, 1);
        setMaterialGroups(updatedGroups);
    };

    // 재료 묶음 삭제
    const delMaterialGroup = (groupIndex: number) => {
        const updatedGroups = materialGroups.filter((_, index) => index !== groupIndex);
        setMaterialGroups(updatedGroups);
    };

    // 재료 정보 업데이트
    const handleInputChange = (
        groupIndex: number,
        materialIndex: number,
        field: string,
        value: string
    ) => {
        const updatedGroups = [...materialGroups];
        updatedGroups[groupIndex].materials[materialIndex][field] = value;
        setMaterialGroups(updatedGroups);
    };

    return (
        <div className="cont_box pad_l_60">
            <p className="cont_tit3">
                재료 정보
                <button
                    id="btnAutoMaterialModal"
                    data-toggle="modal"
                    data-target="#divAutoMaterialModal"
                    type="button"
                    className="btn-sm btn-default"
                >
                    <span className="glyphicon glyphicon-plus"></span> 재료 한번에 입력
                </button>
                <span className="cont_tit3_s">
                    ※ 재료 한번에 입력 버튼을 통해 재료를 "," 쉼표로 구분하여 한번에 입력할 수 있어요.
                </span>
            </p>
            <span className="guide mag_b_15" style={{ width: '100%' }}>
                재료가 남거나 부족하지 않도록 정확한 계량정보를 적어주세요.
            </span>

            {materialGroups.map((group, groupIndex) => (
                <div className="mag_b_25 ui-sortable" key={groupIndex}>
                    <li id={`liMaterialGroup_${groupIndex}`}>
                        <p className="cont_tit6 st2 mag_r_15">
                            <input
                                type="text"
                                value={group.title}
                                onChange={(e) =>
                                    handleInputChange(groupIndex, 0, 'title', e.target.value)
                                }
                                className="form-control"
                                style={{ fontWeight: 'bold', fontSize: '18px', width: '210px' }}
                            />
                        </p>

                        <ul id={`divMaterialArea_${groupIndex}`} className="ui-sortable">
                            {group.materials.map((material, materialIndex) => (
                                <li id={`liMaterial_${groupIndex}_${materialIndex}`} key={materialIndex}>
                                    <input
                                        type="text"
                                        value={material.name}
                                        onChange={(e) =>
                                            handleInputChange(groupIndex, materialIndex, 'name', e.target.value)
                                        }
                                        className="form-control"
                                        style={{ width: '310px' }}
                                        placeholder="예) 돼지고기"
                                    />
                                    <input
                                        type="text"
                                        value={material.amount}
                                        onChange={(e) =>
                                            handleInputChange(groupIndex, materialIndex, 'amount', e.target.value)
                                        }
                                        className="form-control"
                                        style={{ width: '100px' }}
                                        placeholder="10(수량)"
                                    />
                                    <input
                                        type="text"
                                        value={material.unit}
                                        onChange={(e) =>
                                            handleInputChange(groupIndex, materialIndex, 'unit', e.target.value)
                                        }
                                        className="form-control"
                                        style={{ width: '100px' }}
                                        placeholder="예) g,ml(단위)"
                                    />
                                    <input
                                        type="text"
                                        value={material.note}
                                        onChange={(e) =>
                                            handleInputChange(groupIndex, materialIndex, 'note', e.target.value)
                                        }
                                        className="form-control"
                                        style={{ width: '280px' }}
                                        placeholder="예) (비고)"
                                    />
                                    <a
                                        href="javascript:void(0)"
                                        onClick={() => delMaterial(groupIndex, materialIndex)}
                                        className="btn-del"
                                        style={{ display: materialIndex === 0 ? 'none' : 'inline-block' }}
                                    >

                                    </a>
                                </li>
                            ))}
                        </ul>

                        <div
                            className="btn_add"
                            style={{ padding: '0 0 20px 350px', width: '800px' }}
                        >
                            <button
                                type="button"
                                onClick={() => addMaterial(groupIndex)}
                                className="btn btn-default"
                            >
                                <span className="glyphicon glyphicon-plus-sign"></span> 추가
                            </button>
                        </div>
                    </li>

                    <div
                        id={`divMaterialArea2_${groupIndex}`}
                        style={{
                            display: 'flex',
                            justifyContent: 'flex-end',
                            margin: '-20px 0 30px 0',
                        }}
                    >
            <span className="cont_tit_btn">
              <button
                  type="button"
                  onClick={() => delMaterialGroup(groupIndex)}
                  className="btn-sm btn-default"
              >
                <span className="glyphicon glyphicon-minus"></span> 재료 묶음 삭제
              </button>
            </span>
                    </div>
                </div>
            ))}

            <div className="noti">
                ※ 양념, 양념장, 소스, 드레싱, 토핑, 시럽, 육수 밑간 등으로 구분해서 작성해주세요.
                <div className="noti_btn">
                    <button
                        type="button"
                        onClick={addMaterialGroup}
                        className="btn-lg btn-default"
                    >
                        <span className="glyphicon glyphicon-plus"></span> 재료 묶음 추가
                    </button>
                </div>
            </div>
        </div>
    );
};

export default RecipeMaterialInfo;

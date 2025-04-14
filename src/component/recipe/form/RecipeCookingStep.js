import React, { useState } from 'react';

const RecipeCookingStep = () => {
  const [steps, setSteps] = useState([
    { description: '', image: null },
  ]);

  const [stepPhoto, setStepPhoto] = useState('');
  const [stepFile, setStepFile] = useState(null);

  // 파일 선택 처리 함수
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setStepFile(file);
      setStepPhoto(URL.createObjectURL(file));
    }
  };

  // 이미지 클릭 시 파일 선택 창 열기
  const browseStepFile = () => {
    document.getElementById('q_step_file').click();
  };

  const addStep = () => {
    setSteps([...steps, { description: '', image: null }]);
  };

  const deleteStep = (index) => {
    const newSteps = steps.filter((_, i) => i !== index);
    setSteps(newSteps);
  };

  const [workPhotos, setWorkPhotos] = useState([
    { id: 1, photo: '', file: null },
    { id: 2, photo: '', file: null },
    { id: 3, photo: '', file: null },
    { id: 4, photo: '', file: null },
  ]);

  // 파일 선택 처리 함수
  const handleFileChange2 = (event, id) => {
    const file = event.target.files[0];
    if (file) {
      const newWorkPhotos = workPhotos.map((workPhoto) =>
          workPhoto.id === id
              ? { ...workPhoto, photo: URL.createObjectURL(file), file }
              : workPhoto
      );
      setWorkPhotos(newWorkPhotos);
    }
  };

  // 이미지 클릭 시 파일 선택 창 열기
  const browseWorkFile = (id) => {
    document.getElementById(`q_work_file_${id}`).click();
  };

  return (
      <div className="cont_box pad_l_60">
        <p className="cont_tit3">
          요리순서
          <button type="button" onClick={() => document.getElementById('multifile_1').click()}
                  className="btn-sm btn-default">
            <span className="glyphicon glyphicon-plus"></span> 순서사진 한번에 넣기
          </button>
        </p>
        <span className="guide mag_b_15">
        <b>요리의 맛이 좌우될 수 있는 중요한 부분은 빠짐없이 적어주세요.</b>
        <br/>
        예) 10분간 익혀주세요 ▷ 10분간 약한불로 익혀주세요.
        <br/>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;마늘편은 익혀주세요 ▷ 마늘편을 충분히 익혀주셔야 매운 맛이 사라집니다.
        <br/>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;꿀을 조금 넣어주세요 ▷ 꿀이 없는 경우, 설탕 1스푼으로 대체 가능합니다.
      </span>
        <div className="divStepArea">
          {steps.map((step, index) => (
              <div key={index} style={{marginBottom: '20px'}}>
                <p id="divStepNum_1" className="cont_tit2_1 ui-sortable-handle" style={{cursor: 'pointer'}} title="">
                  Step {index + 1}
                </p>
                {/* 설명 입력 */}
                <div id="divStepText_1" style={{display: 'inline-block'}}>
              <textarea
                  name="step_text[]"
                  id="step_text_1"
                  className="form-control step_cont"
                  placeholder="예) 소고기는 기름기를 떼어내고 적당한 크기로 썰어주세요."
                  style={{height: '160px', width: '430px', resize: 'none'}}
                  data-gtm-form-interact-field-id="2"
              ></textarea>
                </div>

                {/* 이미지 업로드 */}
                <div id="divStepUpload_1" style={{display: 'inline-block'}}>
                  {/* hidden input 필드 */}
                  <input type="hidden" name="step_no[]" id="step_no_1" value=""/>
                  <input type="hidden" name="step_photo[]" id="step_photo_1" value={stepPhoto}/>
                  <input type="hidden" name="new_step_photo[]" id="new_step_photo_1" value=""/>
                  <input type="hidden" name="del_step_photo[]" id="del_step_photo_1" value=""/>

                  {/* 파일 업로드를 위한 input */}
                  <div style={{position: 'absolute', left: '-3000px'}}>
                    <input
                        type="file"
                        name="q_step_file_1"
                        id="q_step_file"
                        accept="image/jpeg, image/png, image/gif"
                        style={{display: 'none'}}
                        onChange={handleFileChange}
                    />
                  </div>

                  {/* 이미지 미리보기 */}
                  <div id="divStepPhotoBox_1" is_over="0">
                    <img
                        id="stepPhotoHolder_1"
                        src={stepPhoto || 'https://recipe1.ezmember.co.kr/img/pic_none2.gif'}
                        alt="Step Preview"
                        style={{
                          cursor: 'pointer',
                          width: '160px',
                          height: '160px',
                          objectFit: 'cover', // 이미지 크기를 유지하면서 160x160 크기에 맞추기
                        }}
                        onClick={browseStepFile}
                    />
                  </div>
                </div>

                {/* 단계 삭제 버튼 */}
                {steps.length > 1 && <button onClick={() => deleteStep(index)}>Step 삭제</button>}
              </div>
          ))}
        </div>

        {/* 단계 추가 버튼 */}
        <div className="btn_add mag_b_25" style={{padding: "0 0 20px 180px", width: "820px"}}>
          <button type="button" onClick={addStep} className="btn btn-default"><span
              className="glyphicon glyphicon-plus-sign"></span>순서추가
          </button>
        </div>

        <p className="cont_tit4">요리완성사진
          <input type="file" name="file" id="multifile_2" file_gubun="work" style={{display: "none"}} multiple=""/>
          <br/>
          <button type="button" onClick="document.getElementById('multifile_2').click();"
                  className="btn-sm btn-default"><span className="glyphicon glyphicon-plus"></span> 사진 한번에 넣기
          </button>
        </p>

        <div id="divWorkArea" style={{display: 'inline-block'}} className="ui-sortable">
          {workPhotos.map((workPhoto) => (
              <div key={workPhoto.id} id={`divWorkUpload_${workPhoto.id}`} className="complete_pic">
                {/* hidden input 필드 */}
                <input type="hidden" name="work_photo[]" id={`work_photo_${workPhoto.id}`} value={workPhoto.photo}/>
                <input type="hidden" name="new_work_photo[]" id={`new_work_photo_${workPhoto.id}`} value=""/>
                <input type="hidden" name="del_work_photo[]" id={`del_work_photo_${workPhoto.id}`} value=""/>

                {/* 파일 업로드를 위한 input */}
                <div style={{position: 'absolute', left: '-3000px'}}>
                  <input
                      type="file"
                      name={`q_work_file_${workPhoto.id}`}
                      id={`q_work_file_${workPhoto.id}`}
                      file_gubun="work"
                      accept="image/jpeg, image/png, image/gif"
                      style={{display: 'none', width: '0px', height: '0px', fontSize: '0px'}}
                      onChange={(event) => handleFileChange2(event, workPhoto.id)}
                  />
                </div>

                {/* 이미지 미리보기 */}
                <div id={`divWorkPhotoBox_${workPhoto.id}`} is_over="0">
                  <a href="#" className="pic_del" style={{display: 'none'}}></a>
                  <img
                      id={`workPhotoHolder_${workPhoto.id}`}
                      src={workPhoto.photo || 'https://recipe1.ezmember.co.kr/img/pic_none3.gif'}
                      alt="No Image"
                      style={{width: '140px', height: '140px', cursor: 'pointer'}}
                      onClick={() => browseWorkFile(workPhoto.id)}
                  />
                </div>
              </div>
          ))}
        </div>
      </div>
  );
};

export default RecipeCookingStep;

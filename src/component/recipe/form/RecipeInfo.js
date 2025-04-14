import React, { useState, useEffect } from 'react';
import RecipeCategorySelect from "./RecipeCategorySelect";
import RecipeInfoSelect from "./RecipeInfoSelect";

const RecipeInfo = () => {
    const [title, setTitle] = useState('');
    const [intro, setIntro] = useState('');
    const [videoUrl, setVideoUrl] = useState('');
    const [videoThumbnail, setVideoThumbnail] = useState('https://recipe1.ezmember.co.kr/img/pic_none5.gif');
    const [mainImage, setMainImage] = useState('https://recipe1.ezmember.co.kr/img/pic_none4.gif');

    const browseMainFile = () => {
        document.getElementById('q_main_file')?.click();
    };

    const handleMainFileChange = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                setMainImage(event.target.result);
                console.log('이미지 로딩 완료:', event.target.result); // 디버깅
            };
            reader.readAsDataURL(file);
        }
    };


    useEffect(() => {
        const extractYoutubeId = (url) => {
            const youtubeRegex = /(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([^\s&?/]+)/;
            const match = url.match(youtubeRegex);
            return match ? match[1] : null;
        };

        const videoId = extractYoutubeId(videoUrl);
        if (videoId) {
            setVideoThumbnail(`https://img.youtube.com/vi/${videoId}/0.jpg`);
        } else {
            setVideoThumbnail('https://recipe1.ezmember.co.kr/img/pic_none5.gif');
        }
    }, [videoUrl]);

    return (
        <div className="cont_box pad_l_60">
            <div id="divMainPhotoUpload" className="cont_pic2">
                <input type="hidden" name="main_photo" id="main_photo" value="" />
                <input type="hidden" name="new_main_photo" id="new_main_photo" value="" />
                <input type="hidden" name="del_main_photo" id="del_main_photo" value="" />

                <div style={{ position: 'absolute', left: '-3000px' }}>
                    <input
                        type="file"
                        name="q_main_file"
                        id="q_main_file"
                        data-file-gubun="main"
                        accept="image/jpeg,image/png,image/gif"
                        style={{ display: 'none', width: 0, height: 0, fontSize: 0 }}
                        onChange={handleMainFileChange}
                    />
                </div>

                <div id="divMainPhotoBox" data-is-over="0">
                    <img
                        id="mainPhotoHolder"
                        onClick={browseMainFile}
                        src={mainImage}
                        alt="Main"
                        style={{ width: '250px', height: '250px', cursor: 'pointer' }}
                    />
                </div>
            </div>

            <div className="cont_line">
                <p className="cont_tit4">레시피 제목</p>
                <input
                    type="text"
                    name="cok_title"
                    id="cok_title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="form-control"
                    placeholder="예) 소고기 미역국 끓이기"
                    style={{ width: '610px' }}
                />
            </div>

            <div className="cont_line pad_b_25">
                <p className="cont_tit4">요리소개</p>
                <textarea
                    name="cok_intro"
                    id="cok_intro"
                    className="form-control step_cont"
                    placeholder="이 레시피의 탄생배경을 적어주세요. 예) 남편의 생일을 맞아 소고기 미역국을 끓여봤어요. 어머니로부터 배운 미역국 레시피를 남편의 입맛에 맞게 고안했습니다."
                    style={{ height: '100px', width: '610px', resize: 'none' }}
                    value={intro}
                    onChange={(e) => setIntro(e.target.value)}
                />
            </div>

            <div className="cont_line pad_b_25">
                <p className="cont_tit4">동영상</p>

                <input type="hidden" name="video_photo" id="video_photo" value="" />
                <input type="hidden" name="new_video_photo" id="new_video_photo" value="" />
                <input type="hidden" name="del_video_photo" id="del_video_photo" value="" />
                <input type="hidden" name="cok_video_src" id="cok_video_src" value="" />

                <textarea
                    name="cok_video_url"
                    id="cok_video_url"
                    className="form-control step_cont"
                    placeholder="동영상이 있으면 주소를 입력하세요.(Youtube,네이버tvcast,다음tvpot,인스타그램 만 가능) 예)http://youtu.be/lA0Bxo3IZmM"
                    style={{ height: '100px', width: '380px', resize: 'none' }}
                    value={videoUrl}
                    onChange={(e) => setVideoUrl(e.target.value)}
                />

                <div style={{ position: 'absolute', left: '-3000px' }}>
                    <input
                        type="file"
                        name="q_video_file"
                        id="q_video_file"
                        accept="jpeg,png,gif"
                        style={{
                            display: '',
                            width: '0px',
                            height: '0px',
                            fontSize: '0px',
                        }}
                    />
                </div>

                <div id="divVideoPhotoBox" is-over="0" className="thumb_m">
                    <img
                        id="videoPhotoHolder"
                        src={videoThumbnail}
                        alt="동영상 썸네일"
                        style={{ width: '177px', height: '100px' }}
                    />
                </div>
            </div>

            {/* 카테고리 수정 */}
            <RecipeCategorySelect />

            {/* 레시피 정보 */}
            <RecipeInfoSelect />
        </div>
    );
};

export default RecipeInfo;

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styled from "@emotion/styled";
import KakaoLogin from "react-kakao-login";

const KAKAO_CLIENT_ID = "bb064fe3dff4a0458262cf22c2a9686f";
const USER_SERVICE_URL = "http://localhost:8081/api/auth/login";
const CHECK_USER_URL = "http://localhost:8081/api/auth/check-user";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f9f9f9;
`;

const Form = styled.form`
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  width: 350px;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Input = styled.input`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
`;

const Button = styled.button`
  padding: 10px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  &:hover {
    background-color: #45a049;
  }
`;

const SignupButton = styled(Button)`
  background-color: #008cba;
  &:hover {
    background-color: #007bb5;
  }
`;

const ErrorMessage = styled.p`
  color: red;
  font-size: 14px;
`;

const Login = () => {
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [error, setError] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        try {
            const savedUser = JSON.parse(localStorage.getItem("user"));

            if (savedUser) {
                navigate("/dashboard"); //TODO 사용자가 존재하면 대시보드로 이동
            }
        } catch (error) {
            console.error("❌ 로그인 페이지에서 localStorage 파싱 오류:", error);
            localStorage.removeItem("user"); // 잘못된 데이터 삭제
        }
    }, [navigate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // 백엔드에 로그인 요청
            const res = await axios.post(USER_SERVICE_URL, formData);
            console.log("✅ 로그인 응답:", res.data);

            if (res.data.success) {
                localStorage.setItem("user", JSON.stringify(res.data.user)); // 로그인 성공 시 저장
                navigate("/dashboard");
            } else {
                setError("로그인 실패: 이메일 또는 비밀번호가 틀립니다.");
            }
        } catch (err) {
            setError("서버 오류");
        }
    };

    const handleSignupClick = () => {
        console.log("회원가입 버튼 클릭됨");
        navigate("/signup");
    };

    const handleKakaoSuccess = async (response) => {
        console.log("카카오 로그인 성공:", response);
        const { kakao_account, properties } = response.profile;
        const userData = {
            email: kakao_account.email,
            nickname: properties.nickname,
            profileImage: properties.profile_image,
        };

        try {
            const res = await axios.post(CHECK_USER_URL, { email: userData.email });

            if (res.data.exists) {
                localStorage.setItem("user", JSON.stringify(userData));
                navigate("/dashboard");
            } else {
                localStorage.setItem("tempUser", JSON.stringify(userData));
                navigate("/signup");
            }
        } catch (error) {
            console.error("회원 확인 실패:", error);
        }
    };

    return (
        <Container>
            <h2>로그인</h2>
            {error && <ErrorMessage>{error}</ErrorMessage>}
            <Form onSubmit={handleSubmit}>
                <Input type="email" name="email" placeholder="이메일" onChange={handleChange} required />
                <Input type="password" name="password" placeholder="비밀번호" onChange={handleChange} required />
                <Button type="submit">로그인</Button>
                <SignupButton type="button" onClick={handleSignupClick}>
                    회원가입
                </SignupButton>
                <KakaoLogin
                    token={KAKAO_CLIENT_ID}
                    onSuccess={handleKakaoSuccess}
                    onFail={() => setError("카카오 로그인 실패")}
                    render={(props) => (
                        <Button onClick={props.onClick} style={{ backgroundColor: "#FEE500", color: "#3C1E1E" }}>
                            카카오 로그인
                        </Button>
                    )}
                />
            </Form>
        </Container>
    );
};

export default Login;

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styled from "@emotion/styled";

const USER_SIGNUP_URL = "http://localhost:8081/api/auth/signup"; // 올바른 회원가입 엔드포인트

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
  background-color: #ff6b6b;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  &:hover {
    background-color: #ff4f4f;
  }
`;

const LoginButton = styled(Button)`
  background-color: #008cba;
  &:hover {
    background-color: #007bb5;
  }
`;

const ErrorMessage = styled.p`
  color: red;
  font-size: 14px;
`;

const Signup = () => {
    // const [formData, setFormData] = useState({
    //     username: "",
    //     email: "",
    //     password: "",
    //     confirmPassword: "",
    // });

    const [error, setError] = useState("");
    const navigate = useNavigate();

    // 카카오
    // const [userData, setUserData] = useState({
    //     email: "", nickname: "", phone: ""
    // });

    const [userData, setUserData] = useState(() => {
        const tempUser = JSON.parse(localStorage.getItem("tempUser"));
        return tempUser ? { ...tempUser, phone: "" } : { email: "", name: "", phone: "" };
    });

    useEffect(() => {
        const tempUser = JSON.parse(localStorage.getItem("tempUser"));
        if (tempUser) {
            setUserData({ ...tempUser, phone: "" });
        } else {
            console.warn("임시 사용자 데이터 없음 (Signup 화면 유지)"); // 🔹 디버깅 로그 추가
        }
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // 비밀번호 확인
        if (userData.password !== userData.confirmPassword) {
            setError("비밀번호가 일치하지 않습니다.");
            return;
        }

        // 백엔드에 보낼 데이터
        const requestData = {
            email: userData.email,
            name: userData.name,
            password: userData.password,
        };

        try {
            const res = await axios.post(USER_SIGNUP_URL, requestData, {
                headers: {
                    "Content-Type": "application/json",
                },
                withCredentials: true, // CORS에서 쿠키 및 인증 정보 허용
            });

            if (res.data.success) {
                alert("회원가입이 완료되었습니다. 로그인 페이지로 이동합니다.");
                navigate("/login"); //로그인 페이지로 이동
            } else {
                setError(res.data.message || "회원가입 실패");
            }

        } catch (error) {
            console.error("회원가입 실패:", error);
            setError("서버 오류로 인해 회원가입이 실패했습니다.");
        }
    };

    // const handleChange = (e) => {
    //     setFormData({ ...formData, [e.target.name]: e.target.value });
    // };
    //
    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     if (formData.password !== formData.confirmPassword) {
    //         setError("비밀번호가 일치하지 않습니다.");
    //         return;
    //     }
    //
    //     try {
    //         await axios.post("https://jsonplaceholder.typicode.com/users", {
    //             username: formData.username,
    //             email: formData.email,
    //             password: formData.password,
    //         });
    //         navigate("/login");
    //     } catch (err) {
    //         setError("회원가입 실패");
    //     }
    // };

    const handleLoginClick = () => {
        navigate("/login");
    };

    return (
        <Container>
            <h2>회원가입</h2>
            {error && <ErrorMessage>{error}</ErrorMessage>}
            <Form onSubmit={handleSubmit}>
                <Input type="text" name="name" placeholder="이름" onChange={handleChange} required />
                <Input type="email" name="email" placeholder="이메일" onChange={handleChange} required />
                <Input type="password" name="password" placeholder="비밀번호" onChange={handleChange} required />
                <Input type="password" name="confirmPassword" placeholder="비밀번호 확인" onChange={handleChange} required />

                <Button type="submit">가입하기</Button>
                <LoginButton type="button" onClick={handleLoginClick}>
                    로그인 화면으로 이동
                </LoginButton>
            </Form>
        </Container>
    );
};

export default Signup;

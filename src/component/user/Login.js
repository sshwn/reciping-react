import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styled from "@emotion/styled";

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

const FindIdPwdButton = styled(Button)`
  background-color: #f0ad4e;
  &:hover {
    background-color: #ec971f;
  }
`;

const ErrorMessage = styled.p`
  color: red;
  font-size: 14px;
`;

const CheckboxLabel = styled.label`
  font-size: 14px;
`;

const Login = () => {
    const [formData, setFormData] = useState({ email: "", password: "", rememberMe: false });
    const [error, setError] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const savedUser = JSON.parse(localStorage.getItem("user"));
        if (savedUser) {
            navigate("/dashboard");
        }
    }, [navigate]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.get("https://jsonplaceholder.typicode.com/users");
            const user = res.data.find(
                (user) => user.email === formData.email && user.username === formData.password
            );

            if (user) {
                if (formData.rememberMe) {
                    localStorage.setItem("user", JSON.stringify({ email: user.email }));
                }
                navigate("/dashboard");
            } else {
                setError("로그인 실패: 이메일 또는 비밀번호가 틀립니다.");
            }
        } catch (err) {
            setError("서버 오류");
        }
    };

    const handleSignupClick = () => navigate("/signup");
    const handleFindIdPwdClick = () => navigate("/find-account");

    return (
        <Container>
            <h2>로그인</h2>
            {error && <ErrorMessage>{error}</ErrorMessage>}
            <Form onSubmit={handleSubmit}>
                <Input type="email" name="email" placeholder="이메일" onChange={handleChange} required />
                <Input type="password" name="password" placeholder="비밀번호" onChange={handleChange} required />
                <CheckboxLabel>
                    <input
                        type="checkbox"
                        name="rememberMe"
                        checked={formData.rememberMe}
                        onChange={handleChange}
                    />{" "}
                    로그인 정보 유지
                </CheckboxLabel>
                <Button type="submit">로그인</Button>
                <SignupButton type="button" onClick={handleSignupClick}>
                    회원가입
                </SignupButton>
                <FindIdPwdButton type="button" onClick={handleFindIdPwdClick}>
                    ID/PW 찾기
                </FindIdPwdButton>
            </Form>
        </Container>
    );
};

export default Login;

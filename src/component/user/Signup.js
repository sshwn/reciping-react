import React, { useState } from "react";
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

const ErrorMessage = styled.p`
  color: red;
  font-size: 14px;
`;

const Signup = () => {
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            setError("비밀번호가 일치하지 않습니다.");
            return;
        }

        try {
            await axios.post("https://jsonplaceholder.typicode.com/users", {
                username: formData.username,
                email: formData.email,
                password: formData.password,
            });
            navigate("/login");
        } catch (err) {
            setError("회원가입 실패");
        }
    };

    return (
        <Container>
            <h2>회원가입</h2>
            {error && <ErrorMessage>{error}</ErrorMessage>}
            <Form onSubmit={handleSubmit}>
                <Input type="text" name="username" placeholder="이름" onChange={handleChange} required />
                <Input type="email" name="email" placeholder="이메일" onChange={handleChange} required />
                <Input type="password" name="password" placeholder="비밀번호" onChange={handleChange} required />
                <Input type="password" name="confirmPassword" placeholder="비밀번호 확인" onChange={handleChange} required />
                <Button type="submit">가입하기</Button>
            </Form>
        </Container>
    );
};

export default Signup;

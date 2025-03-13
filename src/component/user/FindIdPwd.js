import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
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
  width: 400px;
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
  background-color: #f0ad4e;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  &:hover {
    background-color: #ec971f;
  }
`;

const BackButton = styled(Button)`
  background-color: #777;
  &:hover {
    background-color: #666;
  }
`;

const FindIdPwd = () => {
    const [email, setEmail] = useState("");  // ✅ 수정된 부분
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        // 실제 ID/PW 찾는 로직 구현
        alert(`입력하신 이메일 (${email})로 ID/PW 안내 메일이 전송되었습니다.`);
    };

    return (
        <Container>
            <h2>ID/PW 찾기</h2>
            <Form onSubmit={handleSubmit}>
                <Input
                    type="email"
                    placeholder="가입 시 입력한 이메일"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <Button type="submit">ID/PW 찾기</Button>
                <Button type="button" onClick={() => navigate("/login")}>
                    로그인 화면으로 이동
                </Button>
            </Form>
        </Container>
    );
};

export default FindIdPwd;

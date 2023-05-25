import "dotenv/config";
import jwt from "jsonwebtoken";

async function loginRequired(req, res, next) {
  //req 헤더에 auth-token 토큰 추출
  const userToken = req.headers["authorization"]?.split(" ")[1];
  //토큰이 없으면 로그인 페이지로
  if (!userToken) {
    return res.status(403).json({ message: "no token" });
  }

  try {
    //환경변수에 저장된 JWT_SECRET_KEY로 userToken을 디코딩 후 확인 , sign이 유효하면 jwtDecoded 변수에 저장
    const jwtDecoded = jwt.verify(userToken, process.env.JWT_SECRET_KEY);
    const { email, role } = jwtDecoded;

    // 라우터에서 필요한경우 req.userId , req.role 을 통해 접근가능!
    req.email = email;
    req.role = role;
    next();
  } catch (err) {
    res.json("loginRequired에러", err);
  }
}

export { loginRequired };

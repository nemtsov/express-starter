-- When adding fields, refer to: http://openid.net/specs/openid-connect-core-1_0.html#StandardClaims
CREATE TABLE users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(320),
  email VARCHAR(320) UNIQUE NOT NULL,
  email_verified BOOLEAN DEFAULT FALSE,
  password text
);

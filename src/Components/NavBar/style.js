import styled from "styled-components";

export const Logo = styled.img`
width: 80px;
position: absolute;
top: 0%;
left: 50%;
transform: translateX(-50%);
display: flex;
padding: 10px;
`
export const Wrapper = styled.div`
display: flex;
position: relative;
`
export const Sidebar = styled.div`
width: 200px;
height: 100%;
background: #030303;
padding: 100px 0px;
position: fixed;
border-right: 2px solid #03e9f4;
justify-content: center;
align-items: center;
a{text-decoration:none; width:auto; padding: 10% 10% 10% 10%; align-items:center};
.fas{width: 25px};
ul , li , a{color:#03e9f4; display: block};
ul , li {padding-left:0px}
a:hover{background-color:#03e9f4; border-radius:20px; color:#030303}
a:hover .fas{color:#030303; background-color: transparent}
`

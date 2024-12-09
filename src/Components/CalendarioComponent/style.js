import styled from "styled-components";

export const MainContent = styled.div`
  margin-left: 200px; 
  display: flex;
  width: auto;
  height: 100vh;
  align-items: flex-start;
  justify-content: center;
  background-color: #707070;
  margin-bottom: 0px;
`
export const Container = styled.div`
  width: 100%;
  height: 80%;
  margin: 20px;
  padding: 5px;
  color: #03e9f4;
  display: flex;
  border-radius: 10px;
  background-color: #030303;
`
export const Left = styled.div`
  width: 60%;
  padding: 20px;
`
export const Calendar = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  color: #030303;
  border-radius: 5px;
  background-color: #fff;
`
export const Month = styled.div`
  width: 100%;
  height: 8vh;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 30px;
  font-size: 1.2rem;
  font-weight: 500;
  text-transform: capitalize;
  background-color: #fff;
  border-bottom: 2px solid aqua;
  i{
    cursor: pointer;
    background-color: transparent;
    :hover{color: aqua}
  }
`

export const Weekdays = styled.div`
  width: 100%;
  height: 6vh;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-left: 30px;
  padding-right:30px;
  font-size: 2.5vh;
  font-weight: 500;
  text-transform: capitalize;
  border-bottom: 2px solid aqua; 
  background-color: #fff;
`
export const Days = styled.div`
  width: 100%;
  height: 50vh;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  padding-left:25px;
  padding-right:25px;
  font-size: 3.3vh;
  font-weight: 500;
  background-color: transparent;
  .day{
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 8px;
    background-color: #fff;
    :hover{
      background-color: aqua;
      color: #030303;
      border-radius:5px;
    }
  }
  .prevday {
    color: gray;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 8px;
    background-color: #fff;
  }
  .nextday {
    color: gray;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 8px;
    background-color: #fff;
  }
  .current-day {
    cursor: pointer;
    border: 0.5px solid black;
    border-radius: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 8px;
    color: aqua;
    background-color: #030303;
  }
`
export const GotoToday = styled.div`
  width: 100%;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  margin-bottom: 5px;
  color: #030303;
  background-color: #fff;
button{
  border: 1px solid #030303;
  background-color: transparent;
  cursor: pointer;
  color: #030303;
  padding-left: 5px;
  padding-right: 10px;
  border-radius: 5px;
:hover{
  color: aqua;
  background-color: #030303;
  border: none;
}
}
`
export const GoTo = styled.div`
  display: flex;
  align-items: center;
  border-radius: 5px;
  overflow: hidden;
  border: 1px solid #030303;
  background-color: #fff;
input{
  width: 100%;
  outline: none;
  border: none;
  color: #030303;
  background-color: transparent;
  padding-left: 10px;
}
`
export const Right = styled.div`
  width: 40%;
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
`
export const BtnAddWrapper = styled.button`
  width: 5vh;
  height: 5vh;
  display: flex;
  align-items: center;
  position: relative;
  top: 60%;
  justify-content: center;
  font-size: 1rem;
  color: #03e9f4;
  border: 2px solid #03e9f4;
  opacity: 0.5;
  border-radius: 50%;
  background-color: transparent;
  cursor: pointer;
  :hover{opacity: 1};
`
export const Wrapper = styled.div`
border: 2px solid aqua;
width: 50vh;
height: 45vh;
position: relative;
bottom: 10%;
border-radius: 10px;
`
export const AddEvent = styled.div`
width: 100%;
height: 100%;
background-color: grey;
div{
  margin-bottom: 15px;
  position: relative;
  left:12vh;
  top: 7vh;
  background-color: transparent;
input{
  width: 50%;
  outline: none;
  border: none;
  color: #030303;
  background-color: transparent;
  border-bottom: 2px solid #030303;
  padding-left: 10px;
}
}
`
export const BtnCloseWrapper = styled.button`
border: none;
 position:relative;
 width: 3.7vh;
 height: 3.7vh;
 border-radius:5px; 
 color:aqua;
 background-color:black;
 left:45vh;
 top: 1vh;
 :hover{background-color: transparent; color :#030303; border : 1px solid aqua};
`
export const BtnAddEvent = styled.button`
 border:2px solid grey;
 position:relative;
 width:30%;
 height: 10%;
 border-radius:5px;
 color:aqua;
 background-color:black;
 left:18vh;
 top:15vh;
 :hover{background-color: transparent; color :#030303; border :1px solid aqua };
`
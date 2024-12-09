import React, { useState } from "react";
import { MainContent, Container, Left, Calendar, Month, Weekdays, Days, GotoToday, GoTo, Right, Wrapper, AddEvent, BtnAddWrapper, BtnCloseWrapper, BtnAddEvent} from "./style";

function CalendarioComponent() {
  const [month, setMonth] = useState(new Date().getMonth());
  const [year, setYear] = useState(new Date().getFullYear());
  const [searchInput, setSearchInput] = useState('');
  const [selectedDay, setSelectedDay] = useState(null);
  const [wrapperOpen, setWrapperOpen] = useState(false);

  const months = [
    "January", "February", "March", "April", "May", "June", "July",
    "August", "September", "October", "November", "December"
  ];

  const renderCalendarDays = () => {
    const daysInMonth = getDaysInMonth(month, year);
    const firstDayOfWeek = getFirstDayOfWeek(month, year);

    const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    const dayColumns = [];
    for (let i = 0; i < 7; i++) {
      dayColumns.push([]);
    }

    // Adiciona os dias do mês anterior
    const prevMonthLastDay = getDaysInMonth(month - 1, year);
    let prevMonthDay = prevMonthLastDay - firstDayOfWeek + 1;
    for (let i = 0; i < firstDayOfWeek; i++) {
      dayColumns[i].push(
        <div key={`prev-day-${prevMonthDay}`} className="prevday">
          {prevMonthDay}
        </div>
      );
      prevMonthDay++;
    }

    // Adiciona os dias do mês atual
    for (let i = 1; i <= daysInMonth; i++) {
      const dayOfWeek = new Date(year, month, i).getDay();
      const currentDate = new Date();
      const isCurrentDay = year === currentDate.getFullYear() && month === currentDate.getMonth() && i === currentDate.getDate();
      const dayClass = isCurrentDay ? "day current-day" : "day";

      dayColumns[dayOfWeek].push(
        <div key={`day-${i}`} className={dayClass} onClick={() => handleDayClick(i)}>
          {i}
        </div>
      );
}

     // Adiciona os dias do próximo mês
     let nextMonthDay = 1;
     for (let i = (firstDayOfWeek + daysInMonth) % 7; i < 7; i++) {
       dayColumns[i].push(
         <div key={`next-day-${nextMonthDay}`} className="nextday">
           {nextMonthDay}
         </div>
       );
       nextMonthDay++;
     }


    // Renderiza os vetores de dias da semana verticalmente
    const renderedDays = dayColumns.map((column, index) => (
      <div key={`column-${index}`} className="column" style={{backgroundColor:"#fff"}}>
        {column}
      </div>
    ));

    return renderedDays;
  };

  //Função para dia atual
  const getCurrentDate = () => {
    const currentDate = new Date();
    const day = currentDate.getDate();
    const currentMonth = currentDate.getMonth(); // Adicione +1 pois o mês é baseado em zero (janeiro = 0)
    const currentYear = currentDate.getFullYear();

    if (currentMonth !== month || currentYear !== year) {
      setMonth(currentMonth); // Atualizar o estado do mês
      setYear(currentYear); // Atualizar o estado do ano
    }
    return `${day}/${currentMonth + 1}/${currentYear}`; // Adicionar +1 ao mês para exibir corretamente
  };

  const handleGetCurrentDate = () => {
    const currentDate = getCurrentDate();
    console.log(currentDate); // Você pode fazer o que quiser com a data atual, como exibir em um alert ou atualizar um estado
  };

  // ------------------------------------------------
  const getDaysInMonth = (month, year) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfWeek = (month, year) => {
    return new Date(year, month, 1).getDay();
  };

  // Função para avançar e retornar os meses
  const prevMonth = () => {
    if (month === 0) {
      setYear(prevYear => prevYear - 1);
      setMonth(11);
    } else {
      setMonth(prevMonth => prevMonth - 1);
    }
  };

  const nextMonth = () => {
    if (month === 11) {
      setYear(prevYear => prevYear + 1);
      setMonth(0);
    } else {
      setMonth(prevMonth => prevMonth + 1);
    }
  };

   // Seleciona determinado dia do calendário
   const handleDayClick = (day) => {
    const formattedDay = day < 10 ? `0${day}` : day;
    const formattedMonth = month < 9 ? `0${month + 1}` : month + 1;
    const formattedYear = year;
    const formattedDate = `${formattedDay}/${formattedMonth}/${formattedYear}`;
    setSelectedDay(formattedDate);
  };

  // Formato da data selecionada
  const formatDate = (date) => {
    const day = date < 10 ? `0${date}` : date;
    const formattedMonth = month < 9 ? `0${month + 1}` : month + 1;
    return `${day}/${formattedMonth}/${year}`;
  };


  // Função para renderizar os dias da semana
  const renderWeekdayHeaders = () => {
    const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    return weekdays.map((weekday, index) => (
      <div key={index} style={{ backgroundColor: "transparent" }}>
        {weekday}
      </div>
    ));
  };

  //Função para buscar data do imput -----------------------------------------------
  const handleInputChange = (event) => {
    setSearchInput(event.target.value);
  };

  const handleGoClick = () => {
    const [inputMonth, inputYear] = searchInput.split('/');
    const parsedMonth = parseInt(inputMonth, 10);
    const parsedYear = parseInt(inputYear, 10);

    if (!isNaN(parsedMonth) && !isNaN(parsedYear)) {
      setMonth(parsedMonth - 1); // Subtrair 1 do mês, pois é baseado em zero
      setYear(parsedYear);
    } else {
      // Lidar com entrada inválida, se necessário
      console.log('Entrada inválida');
    }
    setSearchInput(''); // Limpar o valor do campo de entrada

    // Realizar ação de busca ou qualquer ação desejada com o mês e ano especificados
    console.log(`Buscar: Mês ${parsedMonth}, Ano ${parsedYear}`);
  };

    // abrir o Wrapper
    const handleOpenWrapper = () => {
      setWrapperOpen(true);
    };
    const handleCloseWrapper = () => {
      setWrapperOpen(false);
    };


  return (
    <>
      <MainContent>
        <Container>
          <Left>
            <Calendar>
            <Month>
                <i
                  className="fas fa-angle-left prev"
                  onClick={prevMonth}
                ></i>
                <div style={{ backgroundColor: "transparent" }}>
                  {months[month]} {year}
                </div>
                <i
                  className="fas fa-angle-right next"
                  onClick={nextMonth}
                ></i>
              </Month>
              <Weekdays>
               {renderWeekdayHeaders()}
              </Weekdays>
              <Days>
                {renderCalendarDays(handleDayClick)}
              </Days>
              <div style={{height:"7.5vh", backgroundColor:"#fff", display:"flex", alignItems:"center"}}>
              <GotoToday>
                <GoTo>
                  <input type="text" placeholder="mm/yyyy" value={searchInput} onChange={handleInputChange}/>
                  <button onClick={handleGoClick}>Go</button>
                </GoTo>
                <button onClick={handleGetCurrentDate} >Today</button>
              </GotoToday>
              </div> 
            </Calendar>
          </Left>
          <Right>
            <h3 style={{marginTop:"4vh"}}>Selected Date</h3>
            {selectedDay && (
              <h5 style={{color:"aqua"}}>{selectedDay}</h5>
            )}
            <p style={{color:"gray", position:"relative", top:"30vh", display:"block", fontSize:"15px"}}>No tasks</p>
            <BtnAddWrapper onClick={handleOpenWrapper}><i className="fas fa-plus"></i></BtnAddWrapper>
            {wrapperOpen && (
            <Wrapper>
              <AddEvent>
                <BtnCloseWrapper onClick={handleCloseWrapper}>X</BtnCloseWrapper>
                <div><input type="text" placeholder="Nome do Projeto"></input></div>
                <div><input type="text" placeholder="Responsável"></input></div>
                <div><input type="text" placeholder="Data Requerida"></input></div>
                <BtnAddEvent >Add Event</BtnAddEvent>
              </AddEvent>
            </Wrapper>
          )}
          </Right>
        </Container>
      </MainContent>
    </>
  );
}

export default CalendarioComponent;


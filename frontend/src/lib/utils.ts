
  export const formatTime = ({date}:{date:Date}) => {
    return date.toLocaleTimeString();
  };

 export  const formatDate = ({date,format}:{date:Date,format:"long"|"short"}) => {
    return date.toLocaleDateString(undefined, {
      weekday: format, year: 'numeric', month: format, day: 'numeric'
    });
  };
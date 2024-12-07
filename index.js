const dayDate=document.getElementById('daydate');
const startTimmer=document.getElementById('starttimmer');
const hours=document.getElementById('hours');
const minutes=document.getElementById('min');
const second=document.getElementById('sec');
const counted=document.getElementById('counted');
const stoptimmer=document.getElementById('stoptimmer');
const currentTime=document.querySelector('.times');
const stopTimes=document.querySelector('.stoptimes');
const workingDay=document.querySelector('#workingday');
const workingTime=document.querySelector("#workingTime");
const print=document.getElementById('print');
const dayAndDate = () =>{
    setInterval(() => {
        let d=new Date();
        dayDate.innerHTML='Day and Time:-'+' '+ d.toLocaleString();
    }, 1000);
}
dayAndDate();
let timerInterval;
async function startTimer(){
let date=new Date();
let timesStorage=null;
let getTimeStorage=localStorage.getItem('times');
let setValue=JSON.parse(getTimeStorage);
let count=0;
let hr=0;
let min=0;
let sec=0;
if(setValue !=null && setValue.date === date.toDateString()){
     hr=setValue.hr;
     min=setValue.min;
     sec=setValue.sec; 
}
timerInterval=setInterval(() => {
count++;
if(count==100){
   sec++;
   count=0; 
}
if(sec==60){
   sec=0;
   min++;
}
if(min==60){
   min=0;
   hr++;
}
hours.innerHTML='hr'+' '+hr +' '+':'+' ';
minutes.innerHTML=' '+'min'+' '+min+' '+':'+' ';
second.innerHTML=' '+'sec'+' '+sec+' '+':'+' ';
counted.innerHTML=' '+'count'+' '+count;
let timeValues={
    'hr':hr,
    'min':min,
    'sec':sec,
    'date':date.toDateString(),
};
timesStorage=localStorage.setItem('times',JSON.stringify(timeValues));
}, 10);
}

startTimmer.addEventListener('click',()=>{
    currentTime.style.display='block';
    startTimer();
    startTimmer.style.display="none";
    stoptimmer.style.display="flex";
    stopTimes.style.display="none";
});

function printTodayWorkingDayTime(){
   let d=new Date();
   let getLocalstorageValue=localStorage.getItem('times');
   let converValue=JSON.parse(getLocalstorageValue);
   if(stopTimes){
      workingDay.innerHTML='Today working day:-'+'  '+d.toDateString();
      workingTime.innerHTML='Total working Time:-'+'  '+'Hours:'+' '+converValue.hr+' '+'Minutes:'+' '+converValue.min+' '+'Seconds:'+' '+converValue.sec;
   }

}
stoptimmer.addEventListener('click',function(){
  currentTime.style.display='none';
  startTimmer.style.display="block";
  stoptimmer.style.display="none";
  stopTimes.style.display="block";
  clearInterval(timerInterval);
  printTodayWorkingDayTime();
});

print.addEventListener('click',()=>{
    window.print();
});
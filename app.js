// get elements
const fiverr_form = document.getElementById('fiverr');
const msg = document.querySelector('.msg');
const counter = document.querySelector('.counter');
const alarm = document.getElementById('alarm');
const stop_alarm = document.getElementById('stop_alarm');



let count;
// submit fiverr form
fiverr_form.onsubmit = (e) => {
    e.preventDefault();

    clearInterval(count);

    // get form val
    const form_data = new FormData(e.target);
    const { date, time } = Object.fromEntries(form_data.entries());

    // validation
    if( !date || !time ){
        msg.innerHTML = setAlert('All fields are required');
    }

    // get timestamps
    let start_time = Date.now();
    let end_time = new Date(date + ' ' + time);
    let order_time = Math.floor(Math.abs(end_time.getTime() - start_time)) ;


    // get val from time
    let total_sec = Math.floor( order_time / 1000 );
    let total_min = Math.floor( total_sec / 60 );
    let total_hour = Math.floor( total_min / 60 );
    let total_day = Math.floor( total_hour / 24 );


    let hours = total_hour - ( total_day * 24 );
    let min = total_min - ( total_day * 24 * 60 ) - ( hours * 60 );
    let sec = total_sec - ( total_day * 24 * 60 * 60 ) - ( hours * 60 * 60) - ( min * 60 );


    counter.innerHTML = `<h1>${ total_day } Days : ${ hours } Hours : ${ min } Min : ${ sec } Sec</h1>`;

    count = setInterval( () => {

        futureTimeCountdown(date, time, counter, count, alarm); 

    }, 1000 );
    
     
}



// stop alarm
stop_alarm.onclick = (e) => {
    e.preventDefault();
    alarm.pause();
}
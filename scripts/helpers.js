let helpers = {
    formatPrice: function (rate) {
        return rate.toLocaleString('nl-NL', { style: 'currency', currency: 'EUR', maximumFractionDigits: 2});
        // return '€ ' + ( parseFloat(rate).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ".") );
    },
    formatDate: function (date) {
        var formattedDate = new Date(date).toLocaleDateString('nl-NL', { year: 'numeric', month: 'long', day: 'numeric' });
        if (formattedDate) {
            return formattedDate;
        }
    },
    getToday: function () {
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth()+1;
        var yyyy = today.getFullYear();

        if(dd<10){
            dd='0'+dd
        }
        if(mm<10){
            mm='0'+mm
        }
        var today = yyyy+'-'+mm+'-'+dd;
        return today;
    }
}

export default helpers;
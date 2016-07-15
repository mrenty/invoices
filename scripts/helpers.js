let helpers = {
    formatPrice: function (rate) {
        return rate.toLocaleString('nl-NL', { style: 'currency', currency: 'EUR', maximumFractionDigits: 2});
        // return '€ ' + ( parseFloat(rate).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ".") );
    }
}

export default helpers;
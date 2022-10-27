function currencyFormat(num) {
    if (!num) {
        return 0;
    } else {
        let bum = '' + num;
        return bum.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 ') + '   ₽'
    }
}
export default currencyFormat;
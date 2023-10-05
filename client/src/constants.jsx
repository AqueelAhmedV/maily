// module.exports = {
    
// }
// @ts-ignore
export const routes = {
    SERVER_URL: import.meta.env.VITE_SERVER_URL,
}

export const tracking = {
    mail(userId) {
        return `<br/><br/><br/>
    Sent using Maily&nbsp;
    <img src="${routes.SERVER_URL}/api/analytics/track-mail/${userId}">
    &nbsp;${new Date().getUTCDate()}`}
}
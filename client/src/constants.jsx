
// @ts-ignore
export const routes = {
    SERVER_URL: import.meta.env.VITE_SERVER_URL,
}

export const testUser = {
    firstName: "Test",
    lastName: "Aqueel",
    emailId: "test.aqueel.v@gmail.com",
    id: "Uc95116a"
}

//  MOVE TO SERVER (for scheduled)
export const tracking = {
    mail(userId) {
        return `<p style="color:grey;"><br/><br/><br/>
    Sent using <a href="https://maily-alpha.vercel.app" target="_blank" >Maily</a>&nbsp;
    <img src="${routes.SERVER_URL}/api/analytics/track-mail/" style="height:0;width:0;" >
    <br/>${new Date().toLocaleString()}
    </p>`}
}
exports.getTrackingPixel = (mailId) =>  {
    return `<img src="${process.env.SERVER_URL}/api/analytics/track-mail/${mailId}" style="height:0;width:0;" >`
}

exports.getTimeSignature = () =>  {
    return `
    <p style="color:grey;"><br/><br/><br/>
    Sent using <a href="https://maily-alpha.vercel.app" target="_blank" >Maily</a>&nbsp;
    <br/>${new Date().toLocaleString()}
    </p>
    `
}    

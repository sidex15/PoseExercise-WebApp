export default async function fetchuserinfo(userid) {
    try {
        const res = await fetch('/api/fetchuserinfo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({userid}),
        });

    if (!res.ok) {
        const { message } = await res.json();
        throw new Error(message);
    }

    // store the token in a cookie
    const { userinfo } = await res.json();
    //console.log(userinfo);
    const fuserinfo = userinfo;
    return fuserinfo;

    } catch (error) {
        console.log(error);
    }
};
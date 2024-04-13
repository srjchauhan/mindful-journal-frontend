export const BASE_URL = 'http://localhost:8000';

export const usersEndpoint = {
    login:`${BASE_URL}/user/login`,
    signup:`${BASE_URL}/user/signup`,
    me:`${BASE_URL}/user/me`,

}

export const  journalEndpoint = {
    getUserJournal:`${BASE_URL}/journal/get_user_journals`,
    postJournal:`${BASE_URL}/journal/post_journal`,
    getJournals:`${BASE_URL}/journal/get_journals`,
    randomJournals:`${BASE_URL}/journal/random_journals`,
}
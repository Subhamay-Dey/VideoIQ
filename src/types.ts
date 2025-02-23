type CoinsType = {
    coins: number,
}

type AddUrlErrorType = {
    url?:string,
    userid?:string,
}

type SummaryType = {
    url: string;
    title: string;
    id: string;
    createdAt: Date;
    user_id: number;
    response: string | null;
}
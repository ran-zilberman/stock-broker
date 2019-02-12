export interface QuantoResponse {
    value: string;
}

export const quanto = (req, res) => {
    const response: QuantoResponse =  {value: 'quanto'};
    res.json(response);
}
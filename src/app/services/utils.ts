import { INote } from '../models/interfaces';

export const getShortDate = (text: string | undefined) => {
	if (!text?.trim()) {
		return '';
	}
	const tempDate = new Date(text);
	const day = `0${tempDate.getDate()}`.slice(-2);
	const month = `0${tempDate.getMonth() + 1}`.slice(-2);
	const year = tempDate.getFullYear();
	return `${day}.${month}.${year}`;
};

export const getDetailedDate = (text: string | undefined) => {
	if (!text?.trim()) {
		return '';
	}
	return new Date(text).toLocaleString();
};

export const getSortedList = (arr: INote[]) => {
	return arr.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
};

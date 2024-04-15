export interface ThemeOption{
	id?:number|undefined;
	name?:string;
	desc?:string;
	// 背景
	pageBgColor:string;
	boxBgColor:string;
	hoverColor:string;
	selectColor:string;
	// 按钮
	primaryColor:string;
	infoColor:string;
	warnColor:string;
	// 字体
	mainFontColor:string;
	subFontColor:string;

	createdAt?:string;
	updatedAt?:string;
	deletedAt?:string;
}
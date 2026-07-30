import { get, writable } from "svelte/store";

type SubNames = Record<number, string>;

type SubGoals = Record<number, Record<number, string>>;

interface URIComponentData {
	name: string;
	subNames: SubNames;
	subGoals: SubGoals;
}

const mandalartName = writable("");

export default mandalartName;

export const subNames = writable<string[]>([]);

export const subGoals = writable<string[][]>([[], [], [], [], [], [], [], []]);

export function saveMandalart() {
	const subNamesObject: SubNames = {};
	const subGoalsObject: SubGoals = {};

	if (get(subNames).length !== 0) {
		for (const k in get(subNames)) {
			if (!get(subNames)[k]) continue;
			subNamesObject[Number(k)] = get(subNames)[k];
		}
	}

	if (get(subGoals).length !== 0) {
		for (const k1 in get(subGoals)) {
			for (const k2 in get(subGoals)[k1]) {
				if (!get(subGoals)[k1][k2]) continue;
				if (!subGoalsObject[k1]) subGoalsObject[k1] = {};
				subGoalsObject[k1][k2] = get(subGoals)[k1][k2];
			}
		}
	}

	const data: URIComponentData = {
		name: get(mandalartName),
		subNames: subNamesObject,
		subGoals: subGoalsObject,
	};

	const uriComponent = encodeURIComponent(JSON.stringify(data));
	const encodedData = btoa(uriComponent);

	const url = new URL(window.location.href);
	url.searchParams.set("data", encodedData);
	window.history.replaceState({}, "", url);
}

export function loadMandalArt() {
	const params = new URLSearchParams(window.location.search);

	try {
		const encodedData = params.get("data") || "";
		if (!encodedData) return;
		const decodedData = atob(encodedData);
		const data: URIComponentData = JSON.parse(
			decodeURIComponent(decodedData),
		);

		mandalartName.set(data.name || "");

		const subNamesArray: string[] = [];
		for (const k in data.subNames) {
			if (!data.subNames[k]) continue;
			else subNamesArray[k] = data.subNames[k];
		}

		subNames.set(subNamesArray);

		const subGoalsArray: string[][] = [[], [], [], [], [], [], [], []];
		for (const k1 in data.subGoals) {
			for (const k2 in data.subGoals[k1]) {
				if (!data.subGoals[k1][k2]) continue;
				subGoalsArray[k1][k2] = data.subGoals[k1][k2];
			}
		}

		subGoals.set(subGoalsArray);
	} catch (err) {
		console.error(err);
	}
}

import { Language } from "./language.js";

export class Repository {
    name = String;
    description = String;
    languages = { nodes: Array() };
    forkCount = Number;
    stargazerCount = Number;
    updatedAt = Number;
    isPrivate = Boolean
    months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

    constructor(repository) {
        this.name = repository.name;
        this.description = repository.description;
        this.forkCount = repository.forkCount;
        this.stargazerCount = repository.stargazerCount;
        this.updatedAt = this.formattedLastUpdated(new Date(repository.updatedAt));
        this.isPrivate = repository.isPrivate;
        repository.languages.nodes.forEach((language) => {
            this.languages.nodes.push(new Language(language))
        });
    }

    formattedLastUpdated(updatedAt) {
        return `${updatedAt.getDate()} ${this.months[updatedAt.getMonth()]} ${updatedAt.getFullYear()}`
    }
}
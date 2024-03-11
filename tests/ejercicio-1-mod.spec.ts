import "mocha";
import { expect } from "chai";
import { NewsObserver, Observer, Observable, News} from "../src/ejercicio-1-mod";

describe("OBSERVERS IN NEWS", () => {
  const myNews = new News(0, 'myNews');
  const firstButtonObserver = new NewsObserver(0, 'firstNewsObserver');
  const secondButtonObserver = new NewsObserver(1, 'secondNewsObserver');
  it("comprueba si ya está suscrito y lo desuscribe", () => {
    myNews.subscribe(firstButtonObserver);
    expect(myNews.unsubscribe.bind(firstButtonObserver)).to.not.be.an('error');
  });
  it("UPDATE DE NOTICIAS", () => {
    myNews.onNewsUpdate("Noticia 1");
    myNews.onNewsUpdate("Noticia 2");
    expect(myNews.news).to.be.deep.equal(['Noticia 1', 'Noticia 2']);
  });
  });
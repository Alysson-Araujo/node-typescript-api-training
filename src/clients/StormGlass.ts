import { AxiosStatic } from 'axios';

/**
 * Nesse projeto, nós vamos ficar precisando sempre dos seguintes parâmetros que são passados no link da API externa
 * swellDirection
 * swellHeight
 * swellPeriod
 * waveDirection
 * waveHeight
 * windDirection
 * windSpeed
 *
 * Nesse sentido, vamos colocar elas aqui no código apenas como leitura, para que não haja problemas em seus valores
 */

/**
 * formato desejado da resposta vinda da API EXTERNA. Há um exemplo dela na pasta fixtures do projeto
 *
 *
 */
export interface StormGlassPointSource {
  [key: string]: number; // vem a ser o noaa e seu valor
}

export interface StormGlassPoint {
  readonly swellDirection: StormGlassPointSource;
  readonly swellHeight: StormGlassPointSource;
  readonly swellPeriod: StormGlassPointSource;
  time: string;
  readonly waveDirection: StormGlassPointSource;
  readonly waveHeight: StormGlassPointSource;
  readonly windDirection: StormGlassPointSource;
  readonly windSpeed: StormGlassPointSource;
}

export interface StormGlassForecastResponse {
  hours: StormGlassPoint[];
}

export interface ForecastPoint {
  // a estrutura dos dados normalizado do StormGlassForecastResponse
  time: string;
  swellDirection: number;
  swellHeight: number;
  swellPeriod: number;
  waveDirection: number;
  waveHeight: number;
  windDirection: number;
  windSpeed: number;
}
export class StormGlass {
  readonly stormGlassAPIParams =
    'swellDirection, swellHeight,swellPeriod,waveDirection,waveHeight,windDirection,windSpeed';
  readonly stormGlassAPISource = 'noaa';

  constructor(protected request: AxiosStatic) {}
  public async fetchPoints(lat: number, lng: number): Promise<ForecastPoint[]> {
    const response = this.request.get<StormGlassForecastResponse>(
      `https://api.stormglass.io/v2/weather/point?params=${this.stormGlassAPIParams}&source=${this.stormGlassAPISource}&lat=${lat}&lng=${lng}`
    );

    return this.normalizeResponse((await response).data);
  }

  private normalizeResponse(
    points: StormGlassForecastResponse
  ): ForecastPoint[] {
    return points.hours.filter(this.isValidPoint.bind(this)).map((point) => ({
      // Algoritmo de normalizar os dados
      time: point.time,
      swellDirection: point.swellDirection[this.stormGlassAPISource],
      swellHeight: point.swellHeight[this.stormGlassAPISource],
      swellPeriod: point.swellPeriod[this.stormGlassAPISource],
      waveDirection: point.waveDirection[this.stormGlassAPISource],
      waveHeight: point.waveHeight[this.stormGlassAPISource],
      windDirection: point.windDirection[this.stormGlassAPISource],
      windSpeed: point.windSpeed[this.stormGlassAPISource],
    }));
  }

  private isValidPoint(point: Partial<StormGlassPoint>): boolean {
    // Basicamente, essa função vai garantir que todos os objetos passados possuem as chaves necessárias
    return !!(
      //o !! traz um reforço para que o retorno seja, de fato, boolean Ver essa parte caso precise reçembrar https://youtu.be/x4Llr0DwOaA?t=1000
      (
        point.time &&
        point.swellDirection?.[this.stormGlassAPISource] &&
        point.swellHeight?.[this.stormGlassAPISource] &&
        point.swellPeriod?.[this.stormGlassAPISource] &&
        point.waveDirection?.[this.stormGlassAPISource] &&
        point.waveHeight?.[this.stormGlassAPISource] &&
        point.windDirection?.[this.stormGlassAPISource] &&
        point.windSpeed?.[this.stormGlassAPISource]
      )
    );
  }
}

// Promise<{}> referente a espera de um objeto vazio

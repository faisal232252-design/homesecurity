export type SystemState = 'ARMED_AWAY' | 'ARMED_HOME' | 'DISARMED' | 'SOS';

export interface WeatherData {
  temp: number;
  min: number;
  max: number;
  condition: 'Sunny' | 'Cloudy' | 'Rain' | 'Snow';
}

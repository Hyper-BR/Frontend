export const getTimeZoneByCountry = async (
  countryName: string,
): Promise<string | null> => {
  try {
    const response = await fetch(
      `https://restcountries.com/v3.1/name/${encodeURIComponent(
        countryName,
      )}?fields=timezones`,
    );
    const data = await response.json();

    const timezones = data?.[0]?.timezones;
    if (Array.isArray(timezones) && timezones.length > 0) {
      return timezones[0];
    }

    return null;
  } catch (error) {
    console.error('Erro ao buscar fuso horário:', error);
    return null;
  }
};

FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
WORKDIR /app
EXPOSE 10000

 

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src
COPY ["./Journee.csproj", "Journee_main/"]
RUN dotnet restore "./Journee.csproj"
COPY . .
WORKDIR "/src/Journee_main"
RUN dotnet build "Journee.csproj" -c Release -o /app/build

 

FROM build AS publish
RUN dotnet publish "Journee.csproj" -c Release -o /app/publish

 

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENV ASPNETCORE_URLS=http://0.0.0.0:10000
ENV ASPNETCORE_ENVIRONMENT=Production
ENV Logging__LogLevel__Default=Information
ENTRYPOINT ["dotnet", "Journee.dll"]

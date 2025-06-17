FROM mcr.microsoft.com/dotnet/aspnet:9.0 AS base
USER $APP_UID
WORKDIR /app
EXPOSE 8080
EXPOSE 8081

FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
ARG BUILD_CONFIGURATION=Release
WORKDIR /src
COPY ["RightLine.Api/RightLine.Api.csproj", "RightLine.Api/"]
COPY ["RightLine.DataAccess/RightLine.DataAccess.csproj", "RightLine.DataAccess/"]
RUN dotnet restore "RightLine.Api/RightLine.Api.csproj"
COPY . .
WORKDIR "/src/RightLine.Api"
RUN dotnet build "RightLine.Api.csproj" -c $BUILD_CONFIGURATION -o /app/build

FROM build AS publish
ARG BUILD_CONFIGURATION=Release
RUN dotnet publish "RightLine.Api.csproj" -c $BUILD_CONFIGURATION -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "RightLine.Api.dll"]

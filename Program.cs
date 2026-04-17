using PharmacyApi.Models;
using PharmacyApi.Services;
using System.Text.Json.Serialization;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddSingleton<MedicineService>();

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReact", policy =>
    {
        policy.WithOrigins("http://localhost:5173")
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

builder.Services.ConfigureHttpJsonOptions(options =>
{
    options.SerializerOptions.PropertyNameCaseInsensitive = true;
    options.SerializerOptions.NumberHandling =
        JsonNumberHandling.AllowReadingFromString;
});

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("AllowReact");

app.UseHttpsRedirection();

app.MapGet("/api/medicine", (MedicineService service) =>
{
    return Results.Ok(service.GetAll());
});

app.MapPost("/api/medicine", (Medicine medicine, MedicineService service) =>
{
    service.Add(medicine);
    return Results.Ok(medicine);
});

app.Run();
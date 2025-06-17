namespace RightLine.Api.Extensions;

public static class OrderCodeGenerator
{
    private static readonly Random _random = new Random();
    private const string chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

    public static string GenerateOrderCode()
    {
        var codeChars = new char[6];
        codeChars[0] = 'N';

        for (int i = 1; i < 6; i++)
        {
            codeChars[i] = chars[_random.Next(chars.Length)];
        }

        return new string(codeChars);
    }
}
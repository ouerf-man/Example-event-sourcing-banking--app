import { NextResponse, NextRequest } from "next/server";
import { GetAccountStatementQuery, QueryHandlers } from "@/server/application";
import { EventRepository } from "@/server/infrastructure";

export async function GET(request: NextRequest) {
    try {
      const { searchParams } = new URL(request.url);
      const accountId = searchParams.get('accountId');
  
      if (!accountId) {
        return NextResponse.json(
          { error: 'Missing accountId in query parameters' },
          { status: 400 }
        );
      }
  
      const eventRepo = new EventRepository();
      const queryHandlers = new QueryHandlers(eventRepo);
  
      const query: GetAccountStatementQuery = { accountId };
  
      const statement = await queryHandlers.handleGetAccountStatement(query);
  
      return NextResponse.json({ statement }, { status: 200 });
    } catch (error: any) {
      console.error('Error fetching account statement:', error);
      return NextResponse.json(
        { error: 'Internal Server Error' },
        { status: 500 }
      );
    }
  }
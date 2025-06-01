import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { locales, defaultLocale, type Locale } from '@/lib/i18n';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.email) {
      return NextResponse.json({ locale: defaultLocale });
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: { locale: true }
    });

    return NextResponse.json({ 
      locale: user?.locale || defaultLocale 
    });
  } catch (error) {
    console.error('Error fetching locale:', error);
    return NextResponse.json({ locale: defaultLocale });
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.email) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { locale } = body;

    // Validate locale
    if (!locale || !locales.includes(locale as Locale)) {
      return NextResponse.json(
        { error: 'Invalid locale' },
        { status: 400 }
      );
    }

    // Update user's locale preference
    await prisma.user.update({
      where: { email: session.user.email },
      data: { locale: locale as Locale }
    });

    return NextResponse.json({ 
      success: true,
      locale 
    });
  } catch (error) {
    console.error('Error updating locale:', error);
    return NextResponse.json(
      { error: 'Failed to update locale' },
      { status: 500 }
    );
  }
} 
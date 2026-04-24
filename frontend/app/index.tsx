import { useEffect, useRef } from 'react';
import { View, Text, ScrollView, Animated, Pressable, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

const FEATURES = [
  {
    icon: 'people',
    title: 'Customer CRM',
    desc: 'Add customers, track visits, manage tags & view full profiles.',
    color: '#0EA5E9',
    bg: '#E0F2FE',
    gradient: ['#E0F2FE', '#BAE6FD'],
  },
  {
    icon: 'gift',
    title: 'Loyalty Points',
    desc: 'Auto-earn points on every purchase. Redeem rewards easily.',
    color: '#10B981',
    bg: '#D1FAE5',
    gradient: ['#D1FAE5', '#A7F3D0'],
  },
  {
    icon: 'sparkles',
    title: 'AI Campaigns',
    desc: 'Describe your offer — Claude AI generates WhatsApp messages instantly.',
    color: '#F59E0B',
    bg: '#FEF3C7',
    gradient: ['#FEF3C7', '#FDE68A'],
  },
  {
    icon: 'bar-chart',
    title: 'Revenue Analytics',
    desc: 'Track daily revenue, top customers, and transaction trends.',
    color: '#8B5CF6',
    bg: '#EDE9FE',
    gradient: ['#EDE9FE', '#DDD6FE'],
  },
  {
    icon: 'logo-whatsapp',
    title: 'WhatsApp Marketing',
    desc: 'Send targeted campaigns to the right customers via WhatsApp.',
    color: '#25D366',
    bg: '#DCFCE7',
    gradient: ['#DCFCE7', '#BBF7D0'],
  },
];


export default function LandingScreen() {
  const router = useRouter();

  const heroFade = useRef(new Animated.Value(0)).current;
  const heroSlide = useRef(new Animated.Value(40)).current;
  const logoScale = useRef(new Animated.Value(0.5)).current;
  const logoPulse = useRef(new Animated.Value(1)).current;
  const statsAnim = useRef(new Animated.Value(0)).current;
  const featureAnims = useRef(FEATURES.map(() => new Animated.Value(0))).current;
  const cardAnims = useRef([new Animated.Value(0), new Animated.Value(0)]).current;

  useEffect(() => {
    // Hero entrance
    Animated.parallel([
      Animated.timing(heroFade, { toValue: 1, duration: 500, useNativeDriver: true }),
      Animated.timing(heroSlide, { toValue: 0, duration: 500, useNativeDriver: true }),
      Animated.spring(logoScale, { toValue: 1, tension: 60, friction: 6, useNativeDriver: true }),
    ]).start();

    // Logo pulse loop
    Animated.loop(
      Animated.sequence([
        Animated.timing(logoPulse, { toValue: 1.08, duration: 1500, useNativeDriver: true }),
        Animated.timing(logoPulse, { toValue: 1, duration: 1500, useNativeDriver: true }),
      ])
    ).start();

    // Stats
    Animated.timing(statsAnim, { toValue: 1, duration: 500, delay: 300, useNativeDriver: true }).start();

    // Features staggered
    featureAnims.forEach((anim, i) => {
      Animated.timing(anim, { toValue: 1, duration: 400, delay: 500 + i * 100, useNativeDriver: true }).start();
    });

    // Cards
    cardAnims.forEach((anim, i) => {
      Animated.spring(anim, { toValue: 1, tension: 50, friction: 8, delay: 900 + i * 150, useNativeDriver: true }).start();
    });
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-background" edges={['top', 'bottom']}>
      <ScrollView
        contentContainerStyle={{ paddingBottom: 50 }}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >

        {/* ── HERO ── */}
        <LinearGradient
          colors={['#0369A1', '#0284C7', '#0EA5E9', '#38BDF8']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={{ paddingTop: 40, paddingBottom: 50, paddingHorizontal: 24, borderBottomLeftRadius: 36, borderBottomRightRadius: 36 }}
        >
          <Animated.View style={{ opacity: heroFade, transform: [{ translateY: heroSlide }] }}>
            <View className="items-center">
              {/* Pulsing Logo */}
              <Animated.View style={{ transform: [{ scale: Animated.multiply(logoScale, logoPulse) }] }}>
                <View
                  className="w-24 h-24 rounded-[28px] bg-white/20 items-center justify-center mb-6"
                  style={{ shadowColor: '#000', shadowOpacity: 0.2, shadowRadius: 16, elevation: 10 }}
                >
                  <Ionicons name="leaf" size={48} color="#fff" />
                </View>
              </Animated.View>

              <Text style={{ fontSize: 46, lineHeight: 52 }} className="font-sans-extrabold text-white text-center tracking-tight mb-1">
                BizGrow
              </Text>
              <Text className="text-sm font-sans-bold text-white/50 uppercase tracking-[4px] mb-5">
                CRM + AI for Kirana Stores
              </Text>
              <Text className="text-base font-sans-medium text-white/85 text-center px-2 leading-6">
                Track customers, manage loyalty points, and run AI-powered WhatsApp campaigns — all from one app.
              </Text>
            </View>
          </Animated.View>


        </LinearGradient>

        <View className="px-5 -mt-6">

          {/* ── FEATURES ── */}
          <View className="rounded-3xl bg-card border border-border p-5 mb-5 shadow-sm">
            <Text className="text-[11px] font-sans-bold text-muted-foreground uppercase tracking-[2px] mb-5">
              ✦  Why BizGrow?
            </Text>
            {FEATURES.map((f, i) => (
              <Animated.View
                key={f.title}
                style={{
                  opacity: featureAnims[i],
                  transform: [{
                    translateX: featureAnims[i].interpolate({ inputRange: [0, 1], outputRange: [-30, 0] }),
                  }],
                }}
              >
                <Pressable
                  className="flex-row items-center gap-4 mb-4 p-3 rounded-2xl"
                  style={{ backgroundColor: f.bg + '40' }}
                  android_ripple={{ color: f.bg }}
                >
                  <LinearGradient
                    colors={f.gradient as [string, string]}
                    className="w-12 h-12 rounded-2xl items-center justify-center"
                    style={{ width: 48, height: 48, borderRadius: 16, alignItems: 'center', justifyContent: 'center' }}
                  >
                    <Ionicons name={f.icon as any} size={24} color={f.color} />
                  </LinearGradient>
                  <View className="flex-1">
                    <Text className="text-[15px] font-sans-bold text-foreground">{f.title}</Text>
                    <Text className="text-xs font-sans-medium text-muted-foreground leading-4 mt-0.5">{f.desc}</Text>
                  </View>
                  <Ionicons name="chevron-forward" size={16} color="#CBD5E1" />
                </Pressable>
              </Animated.View>
            ))}
          </View>

          {/* ── MERCHANT CARD ── */}
          <Animated.View style={{ opacity: cardAnims[0], transform: [{ scale: cardAnims[0].interpolate({ inputRange: [0, 1], outputRange: [0.92, 1] }) }] }}>
            <LinearGradient
              colors={['#0EA5E9', '#0284C7']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={{ borderRadius: 24, padding: 24, marginBottom: 16 }}
            >
              <View className="flex-row items-center gap-3 mb-1">
                <View className="w-11 h-11 rounded-2xl bg-white/20 items-center justify-center">
                  <Ionicons name="storefront" size={22} color="#fff" />
                </View>
                <View>
                  <Text className="text-xl font-sans-bold text-white">For Merchants</Text>
                  <Text className="text-xs font-sans-medium text-white/70">Manage & grow your business</Text>
                </View>
              </View>
              <View className="flex-row gap-3 mt-5">
                <Pressable
                  className="flex-1 bg-white py-3.5 rounded-2xl items-center flex-row justify-center gap-2"
                  android_ripple={{ color: 'rgba(14,165,233,0.15)' }}
                  onPress={() => router.push('/(auth)/merchant/signup')}
                >
                  <Ionicons name="person-add" size={16} color="#0284C7" />
                  <Text style={{ color: '#0284C7' }} className="font-sans-bold text-sm">Sign Up</Text>
                </Pressable>
                <Pressable
                  className="flex-1 bg-white/20 py-3.5 rounded-2xl items-center flex-row justify-center gap-2"
                  android_ripple={{ color: 'rgba(255,255,255,0.2)' }}
                  onPress={() => router.push('/(auth)/merchant/login')}
                >
                  <Ionicons name="log-in" size={16} color="#fff" />
                  <Text className="text-white font-sans-bold text-sm">Login</Text>
                </Pressable>
              </View>
            </LinearGradient>
          </Animated.View>

          {/* ── CUSTOMER CARD ── */}
          <Animated.View style={{ opacity: cardAnims[1], transform: [{ scale: cardAnims[1].interpolate({ inputRange: [0, 1], outputRange: [0.92, 1] }) }] }}>
            <LinearGradient
              colors={['#10B981', '#059669']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={{ borderRadius: 24, padding: 24, marginBottom: 16 }}
            >
              <View className="flex-row items-center gap-3 mb-1">
                <View className="w-11 h-11 rounded-2xl bg-white/20 items-center justify-center">
                  <Ionicons name="gift" size={22} color="#fff" />
                </View>
                <View>
                  <Text className="text-xl font-sans-bold text-white">For Customers</Text>
                  <Text className="text-xs font-sans-medium text-white/70">Earn points & redeem rewards</Text>
                </View>
              </View>
              <View className="flex-row gap-3 mt-5">
                <Pressable
                  className="flex-1 bg-white py-3.5 rounded-2xl items-center flex-row justify-center gap-2"
                  android_ripple={{ color: 'rgba(16,185,129,0.15)' }}
                  onPress={() => router.push('/(auth)/customer/signup')}
                >
                  <Ionicons name="person-add" size={16} color="#059669" />
                  <Text style={{ color: '#059669' }} className="font-sans-bold text-sm">Sign Up</Text>
                </Pressable>
                <Pressable
                  className="flex-1 bg-white/20 py-3.5 rounded-2xl items-center flex-row justify-center gap-2"
                  android_ripple={{ color: 'rgba(255,255,255,0.2)' }}
                  onPress={() => router.push('/(auth)/customer/login')}
                >
                  <Ionicons name="log-in" size={16} color="#fff" />
                  <Text className="text-white font-sans-bold text-sm">Login</Text>
                </Pressable>
              </View>
            </LinearGradient>
          </Animated.View>

          {/* ── CONTACT ── */}
          <View className="items-center mt-3 mb-2">
            <Pressable
              className="flex-row items-center gap-2 bg-muted px-6 py-3.5 rounded-full"
              android_ripple={{ color: 'rgba(0,0,0,0.06)' }}
              onPress={() => router.push('/contact')}
            >
              <Ionicons name="chatbubbles-outline" size={16} color="#64748B" />
              <Text className="text-sm font-sans-semibold text-muted-foreground">Need help? Contact Us</Text>
            </Pressable>
          </View>

          {/* ── FOOTER ── */}
          <View className="items-center mt-5">
            <Text className="text-[10px] font-sans-medium text-muted-foreground/40 uppercase tracking-[2px]">
              v1.0.0 · Hackathon 2026
            </Text>
          </View>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}
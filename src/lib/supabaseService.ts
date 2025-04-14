import { createClient } from '@supabase/supabase-js';
import type { CartItem } from './cartStore';

// Replace with your Supabase URL and anon key
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Initialize the Supabase client
export const supabase = createClient(supabaseUrl, supabaseKey);

// Function to save an order to Supabase
export async function saveOrderToSupabase(items: CartItem[], totalAmount: number, orderId: string) {
    try {
        // 1. First, create the main order record
        const { data: order, error: orderError } = await supabase
            .from('orders')
            .insert({
                order_id: orderId,
                total_amount: totalAmount
            })
            .select()
            .single();

        if (orderError) throw orderError;

        // 2. Then create records for each item in the order
        const orderItems = items.map(item => ({
            order_id: order.id, // This is the UUID from the orders table
            item_id: item.id,
            color: item.color,
            scale: item.order.scale,
            kits: item.order.kits,
            figures: item.order.figures,
            figures_per_kit: item.order.figuresPerKit,
            total_figures: item.order.totalFigures,
            total_amount: item.order.totalAmount,
            cost_per_figure: item.order.costPerFigure
        }));

        const { error: itemsError } = await supabase
            .from('order_items')
            .insert(orderItems);

        if (itemsError) throw itemsError;

        return { success: true, orderId: order.id };
    } catch (error) {
        console.error('Error saving order to Supabase:', error);
        return { success: false, error };
    }
}

// Function to get order details by order_id
export async function getOrderByOrderId(orderId: string) {
    try {
        // Get the main order
        const { data: order, error: orderError } = await supabase
            .from('orders')
            .select('*')
            .eq('order_id', orderId)
            .single();

        if (orderError) throw orderError;

        // Get all items for this order
        const { data: items, error: itemsError } = await supabase
            .from('order_items')
            .select('*')
            .eq('order_id', order.id);

        if (itemsError) throw itemsError;

        return { success: true, order, items };
    } catch (error) {
        console.error('Error fetching order:', error);
        return { success: false, error };
    }
}
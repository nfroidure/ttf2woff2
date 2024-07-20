# This file is generated by gyp; do not edit.

TOOLSET := target
TARGET := addon
DEFS_Debug := \
	'-DNODE_GYP_MODULE_NAME=addon' \
	'-DUSING_UV_SHARED=1' \
	'-DUSING_V8_SHARED=1' \
	'-DV8_DEPRECATION_WARNINGS=1' \
	'-D_GLIBCXX_USE_CXX11_ABI=1' \
	'-D_LARGEFILE_SOURCE' \
	'-D_FILE_OFFSET_BITS=64' \
	'-D__STDC_FORMAT_MACROS' \
	'-DOPENSSL_NO_PINSHARED' \
	'-DOPENSSL_THREADS' \
	'-DBUILDING_NODE_EXTENSION' \
	'-DDEBUG' \
	'-D_DEBUG'

# Flags passed to all source files.
CFLAGS_Debug := \
	-fPIC \
	-pthread \
	-Wall \
	-Wextra \
	-Wno-unused-parameter \
	-w \
	-m64 \
	-g \
	-O0

# Flags passed to only C files.
CFLAGS_C_Debug :=

# Flags passed to only C++ files.
CFLAGS_CC_Debug := \
	-fno-rtti \
	-fno-exceptions \
	-std=gnu++17

INCS_Debug := \
	-I/home/nfroidure/.cache/node-gyp/20.14.0/include/node \
	-I/home/nfroidure/.cache/node-gyp/20.14.0/src \
	-I/home/nfroidure/.cache/node-gyp/20.14.0/deps/openssl/config \
	-I/home/nfroidure/.cache/node-gyp/20.14.0/deps/openssl/openssl/include \
	-I/home/nfroidure/.cache/node-gyp/20.14.0/deps/uv/include \
	-I/home/nfroidure/.cache/node-gyp/20.14.0/deps/zlib \
	-I/home/nfroidure/.cache/node-gyp/20.14.0/deps/v8/include \
	-I$(srcdir)/node_modules/nan

DEFS_Release := \
	'-DNODE_GYP_MODULE_NAME=addon' \
	'-DUSING_UV_SHARED=1' \
	'-DUSING_V8_SHARED=1' \
	'-DV8_DEPRECATION_WARNINGS=1' \
	'-D_GLIBCXX_USE_CXX11_ABI=1' \
	'-D_LARGEFILE_SOURCE' \
	'-D_FILE_OFFSET_BITS=64' \
	'-D__STDC_FORMAT_MACROS' \
	'-DOPENSSL_NO_PINSHARED' \
	'-DOPENSSL_THREADS' \
	'-DBUILDING_NODE_EXTENSION'

# Flags passed to all source files.
CFLAGS_Release := \
	-fPIC \
	-pthread \
	-Wall \
	-Wextra \
	-Wno-unused-parameter \
	-w \
	-m64 \
	-O3 \
	-fno-omit-frame-pointer

# Flags passed to only C files.
CFLAGS_C_Release :=

# Flags passed to only C++ files.
CFLAGS_CC_Release := \
	-fno-rtti \
	-fno-exceptions \
	-std=gnu++17

INCS_Release := \
	-I/home/nfroidure/.cache/node-gyp/20.14.0/include/node \
	-I/home/nfroidure/.cache/node-gyp/20.14.0/src \
	-I/home/nfroidure/.cache/node-gyp/20.14.0/deps/openssl/config \
	-I/home/nfroidure/.cache/node-gyp/20.14.0/deps/openssl/openssl/include \
	-I/home/nfroidure/.cache/node-gyp/20.14.0/deps/uv/include \
	-I/home/nfroidure/.cache/node-gyp/20.14.0/deps/zlib \
	-I/home/nfroidure/.cache/node-gyp/20.14.0/deps/v8/include \
	-I$(srcdir)/node_modules/nan

OBJS := \
	$(obj).target/$(TARGET)/csrc/addon.o \
	$(obj).target/$(TARGET)/csrc/woff2/glyph.o \
	$(obj).target/$(TARGET)/csrc/woff2/font.o \
	$(obj).target/$(TARGET)/csrc/woff2/normalize.o \
	$(obj).target/$(TARGET)/csrc/woff2/table_tags.o \
	$(obj).target/$(TARGET)/csrc/woff2/transform.o \
	$(obj).target/$(TARGET)/csrc/woff2/variable_length.o \
	$(obj).target/$(TARGET)/csrc/woff2/woff2_common.o \
	$(obj).target/$(TARGET)/csrc/woff2/woff2_enc.o \
	$(obj).target/$(TARGET)/csrc/enc/backward_references.o \
	$(obj).target/$(TARGET)/csrc/enc/block_splitter.o \
	$(obj).target/$(TARGET)/csrc/enc/brotli_bit_stream.o \
	$(obj).target/$(TARGET)/csrc/enc/encode.o \
	$(obj).target/$(TARGET)/csrc/enc/encode_parallel.o \
	$(obj).target/$(TARGET)/csrc/enc/entropy_encode.o \
	$(obj).target/$(TARGET)/csrc/enc/histogram.o \
	$(obj).target/$(TARGET)/csrc/enc/literal_cost.o \
	$(obj).target/$(TARGET)/csrc/enc/metablock.o \
	$(obj).target/$(TARGET)/csrc/enc/streams.o

# Add to the list of files we specially track dependencies for.
all_deps += $(OBJS)

# CFLAGS et al overrides must be target-local.
# See "Target-specific Variable Values" in the GNU Make manual.
$(OBJS): TOOLSET := $(TOOLSET)
$(OBJS): GYP_CFLAGS := $(DEFS_$(BUILDTYPE)) $(INCS_$(BUILDTYPE))  $(CFLAGS_$(BUILDTYPE)) $(CFLAGS_C_$(BUILDTYPE))
$(OBJS): GYP_CXXFLAGS := $(DEFS_$(BUILDTYPE)) $(INCS_$(BUILDTYPE))  $(CFLAGS_$(BUILDTYPE)) $(CFLAGS_CC_$(BUILDTYPE))

# Suffix rules, putting all outputs into $(obj).

$(obj).$(TOOLSET)/$(TARGET)/%.o: $(srcdir)/%.cc FORCE_DO_CMD
	@$(call do_cmd,cxx,1)

# Try building from generated source, too.

$(obj).$(TOOLSET)/$(TARGET)/%.o: $(obj).$(TOOLSET)/%.cc FORCE_DO_CMD
	@$(call do_cmd,cxx,1)

$(obj).$(TOOLSET)/$(TARGET)/%.o: $(obj)/%.cc FORCE_DO_CMD
	@$(call do_cmd,cxx,1)

# End of this set of suffix rules
### Rules for final target.
LDFLAGS_Debug := \
	-pthread \
	-rdynamic \
	-m64

LDFLAGS_Release := \
	-pthread \
	-rdynamic \
	-m64

LIBS :=

$(obj).target/addon.node: GYP_LDFLAGS := $(LDFLAGS_$(BUILDTYPE))
$(obj).target/addon.node: LIBS := $(LIBS)
$(obj).target/addon.node: TOOLSET := $(TOOLSET)
$(obj).target/addon.node: $(OBJS) FORCE_DO_CMD
	$(call do_cmd,solink_module)

all_deps += $(obj).target/addon.node
# Add target alias
.PHONY: addon
addon: $(builddir)/addon.node

# Copy this to the executable output path.
$(builddir)/addon.node: TOOLSET := $(TOOLSET)
$(builddir)/addon.node: $(obj).target/addon.node FORCE_DO_CMD
	$(call do_cmd,copy)

all_deps += $(builddir)/addon.node
# Short alias for building this executable.
.PHONY: addon.node
addon.node: $(obj).target/addon.node $(builddir)/addon.node

# Add executable to "all" target.
.PHONY: all
all: $(builddir)/addon.node

